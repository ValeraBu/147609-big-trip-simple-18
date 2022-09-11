import {render, RenderPosition} from '../framework/render.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import {generateSort} from '../mock/sort.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class PagePresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #tripListComponent = new TripEventsListView();
  #listEmptyComponent = new ListEmptyView();

  #points = [];
  #pointPresenter = new Map();

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    render(new SortView(generateSort()), this.#eventsContainer, RenderPosition.AFTERBEGIN);
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
