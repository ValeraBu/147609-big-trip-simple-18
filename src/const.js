import {getCurrentTime} from './utils/point.js';

const DEFAULT_POINT = {
  basePrice: null,
  dateFrom: getCurrentTime(),
  dateTo: getCurrentTime(),
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  offers: [],
  type: 'taxi',
};

const SortType = {
  DAY: 'day',
  PRICE: 'price'
};

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const UserActions = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const EmptyListTextValues = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const ErrorDataMessage = 'Ooops! Something went wrong. Please try again later...';

export {
  FilterType,
  SortType,
  UpdateType,
  UserActions,
  DEFAULT_POINT,
  EmptyListTextValues,
  Mode,
  ErrorDataMessage
};
