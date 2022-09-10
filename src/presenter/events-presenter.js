import {render} from '../framework/render.js';
import EventView from '../view/point-view.js';
import EventEditView from '../view/event-edit-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import {generateSort} from '../mock/sort.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #tripListComponent = new TripEventsListView();

  #points = [];

  init = (eventsContainer, pointsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];

    render(new SortView(generateSort()), this.#eventsContainer);
    render(this.#tripListComponent, this.#eventsContainer);

    if(this.#points.length > 0) {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    } else {
      render(new ListEmptyView(), this.#tripListComponent.element);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new EventView(point);
    const pointEditComponent = new EventEditView(point);

    const replaceCardToForm = () => {
      this.#tripListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#tripListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#tripListComponent.element);
  };
}
