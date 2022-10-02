import {render, remove,RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import ListEmptyView from '../view/list-empty-view.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import {SortType, UpdateType, FilterType, UserActions, ErrorDataMessage} from '../const.js';
import {sortPointDay, sortPointPrice} from '../utils/point.js';
import LoadingView from '../view/loading-view.js';
import {filter} from '../utils/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class PagePresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #eventsListComponent = new EventsListView();
  #listEmptyComponent = null;
  #loadingComponent = new LoadingView();
  #newEventButton = document.querySelector('.trip-main__event-add-btn');

  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(eventsContainer, pointsModel, filterModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter(this.#eventsListComponent.element, this.#pointsModel, this.#handleViewAction);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #renderLoading = () => {
    render(this.#loadingComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, point) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserActions.UPDATE_POINT:
        this.#pointPresenter.get(point.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, point);
          this.#pointPresenter.forEach((presenter) => presenter.resetView());
        } catch(err) {
          this.#pointPresenter.get(point.id).setAborting();
        }
        break;
      case UserActions.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, point);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserActions.DELETE_POINT:
        this.#pointPresenter.get(point.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, point);
        } catch(err) {
          this.#pointPresenter.get(point.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({ resetSortType: true });
        this.#renderPointsList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #getErrorDataMessage() {
    if (!this.#pointsModel.offers.length || !this.#pointsModel.destinations.length) {
      this.#newEventButton.disabled = true;
      return ErrorDataMessage;
    }
  }

  #renderListEmpty = () => {
    this.#listEmptyComponent = new ListEmptyView(this.#filterType, this.#getErrorDataMessage());
    render(this.#listEmptyComponent, this.#eventsListComponent.element);
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return filteredPoints;
  }

  init = () => {
    render(this.#eventsListComponent, this.#eventsContainer);
    this.#renderPointsList();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback, this.#pointsModel.offers, this.#pointsModel.destinations);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderPointsList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    if (!points.length) {
      this.#renderListEmpty();
    }
    this.#renderSort();
    this.#renderPoints(points);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#pointsModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.offers, this.#pointsModel.destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointsList = ({ resetSortType = false } = {}) => {
    this.#newPointPresenter.destroy();

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };
}
