import dayjs from 'dayjs';

const humanizePointDate = (date) => dayjs(date).format('MMM D');

const humanizePointTime = (date) => dayjs(date).format('hh:mm');

const humanizePointDateNumber = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

const getPointDateRFC = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');

const isDataSubmitDisabled = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom)) <= 0;

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  humanizePointDate,
  humanizePointTime,
  humanizePointDateNumber,
  getPointDateRFC,
  isDataSubmitDisabled,
  sortPointDay,
  sortPointPrice
};
