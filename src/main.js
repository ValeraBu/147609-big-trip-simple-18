import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import PagePresenter from './presenter/page-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const pointsModel = new PointsModel();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');
const pagePresenter = new PagePresenter(tripEventsElement, pointsModel);

const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), filtersElement);

pagePresenter.init();
