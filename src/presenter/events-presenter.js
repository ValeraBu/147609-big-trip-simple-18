import EventCreateView from '../view/event-create-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  tripListComponent = new TripEventsListView();
  eventCreateComponent = new EventCreateView();
  eventEditComponent = new EventEditView();
  sortViewComponent = new SortView();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    render(this.sortViewComponent, this.eventsContainer);
    render(this.tripListComponent, this.eventsContainer);
    render(this.eventEditComponent, this.tripListComponent.getElement());
    render(this.eventCreateComponent, this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.tripListComponent.getElement());
    }
  };
}
