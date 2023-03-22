//функция-генератор для получения случайного числа

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//функция с логикой по поиску случайного элемента в переданном массиве

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

//функция-генератор для получения случайных ID из диапазона, без повтора, пока не будут перебраны все числа из промежутка

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//проверка нажатой клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey};
