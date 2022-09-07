import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import PagePresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';

const pointsModel = new PointsModel();
const pagePresenter = new PagePresenter();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), filtersElement);

pagePresenter.init(tripEventsElement, pointsModel);
