import {nanoid} from 'nanoid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateIdsArr = (n) => (Array.from({length: n}, nanoid));

export {
  getRandomInteger,
  generateIdsArr
};
