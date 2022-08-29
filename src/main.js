import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import PagePresenter from './presenter/events-presenter.js';

const boardPresenter = new PagePresenter();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

render(new FiltersView(), filtersElement);

boardPresenter.init(tripEventsElement);
