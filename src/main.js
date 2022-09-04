import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import PagePresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';

const pointsModel = new PointsModel();
const pagePresenter = new PagePresenter();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

render(new FiltersView(), filtersElement);

pagePresenter.init(tripEventsElement, pointsModel);
