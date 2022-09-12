import {render, RenderPosition} from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortPointDay, sortPointPrice} from '../utils/point.js';
import {SORT_TYPE} from '../const.js';

export default class PagePresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #tripListComponent = new TripEventsListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #points = [];
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedPoints = [];

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#points.sort(sortPointDay);
        break;
      case SORT_TYPE.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoint();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoints = () => {
    render(this.#tripListComponent, this.#eventsContainer);
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#tripListComponent.element);
  };

  init = (eventsContainer, pointsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

    if(this.#points.length > 0) {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    } else {
      this.#renderListEmpty();
    }

    this.#renderSort();
    this.#renderPoints();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
