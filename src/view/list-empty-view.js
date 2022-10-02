import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListTextValues} from '../const.js';

const createTripListTemplate = (filterType, errorData) => {
  const emptyListTextValue = EmptyListTextValues[filterType];

  return (
    `<p class="trip-events__msg">
      ${errorData ?? emptyListTextValue}
    </p>`);
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;
  #errorData = null;

  constructor(filterType, errorData) {
    super();
    this.#filterType = filterType;
    this.#errorData = errorData;
  }

  get template() {
    return createTripListTemplate(this.#filterType, this.#errorData);
  }
}
