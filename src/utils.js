import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDate = (date) => dayjs(date).format('MMM D');

const humanizePointTime = (date) => dayjs(date).format('hh:mm');

const humanizePointDateNumber = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

const getPointDateRFC = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');

const generateIdsArr = (n) => (Array.from({length: n}, nanoid));

export {
  getRandomInteger,
  humanizePointDate,
  humanizePointTime,
  generateIdsArr,
  humanizePointDateNumber,
  getPointDateRFC
};
