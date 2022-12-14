import {FilterType} from '../const';
import {isFutureDate} from './common.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom))
};

export {filter};
