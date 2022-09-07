import dayjs from 'dayjs';

const humanizePointDate = (date) => dayjs(date).format('MMM D');

const humanizePointTime = (date) => dayjs(date).format('hh:mm');

const humanizePointDateNumber = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

const getPointDateRFC = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');


export {
  humanizePointDate,
  humanizePointTime,
  humanizePointDateNumber,
  getPointDateRFC
};
