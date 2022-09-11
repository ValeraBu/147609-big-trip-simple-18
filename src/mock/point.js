import dayjs from 'dayjs';
import {getRandomInteger, generateIdsArr} from '../utils/common.js';
import {TYPES, TOWNS} from '../const.js';
import {nanoid} from 'nanoid';

const idsArray = generateIdsArr(50);

const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const getRandomTitle = () => {
  const randomIndex = getRandomInteger(0, TOWNS.length - 1);
  return TOWNS[randomIndex];
};

const getRandomDescription = () => {
  const descriptionArray = mockText.split('.');
  const randomIndex = getRandomInteger(0, descriptionArray.length - 1);
  return descriptionArray[randomIndex];
};

const generateImageLink = () => (
  {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: getRandomDescription()
  }
);

const generateDestination = () => {
  const destination = {
    id: idsArray[getRandomInteger(0, 49)],
    description: getRandomDescription(),
    name: getRandomTitle(),
    pictures: Array.from({length: 4}, generateImageLink)
  };

  return destination;
};

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generateOffer = () => {
  const offer = {
    id: idsArray[getRandomInteger(0, 49)],
    title: getRandomTitle(),
    price: getRandomInteger(1, 500000)
  };

  return offer;
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(1, 500000),
  dateFrom: generateDate(),
  dateTo: generateDate(),
  destination: generateDestination(),
  // id: getRandomInteger(0, 1000),
  id: nanoid(),
  offers: Array.from({length: 5}, generateOffer),
  type: getRandomType()
});
