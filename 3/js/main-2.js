// const PHOTO_COUNT = 25;
// const LIKES_COUNT_MIN = 15;
// const LIKES_COUNT_MAX = 200;
// const COMMENT_COUNT = 100;
// const AVATAR_COUNT = 6;

// const DESCRIPTIONS = [
//   'Лучшее фото этого года',
//   'Пулитцеровская премия за художественную фотографию',
//   'Захватывает дух',
//   'Как вернуться в это время?',
//   'Записываемся ко мне на фотосъемку!',
//   'Быбрал лучшее из 100500 фотографий',
//   'Снял на домофон',
//   'Уникальный момент',
//   'Нейросети такое не сгенерируют!',
//   'Описание напишу потом, сейчас отдыхаю',
//   'Чем меньше фото у человека, тем насыщеннее у него жизнь',
//   'Ставьте лайки, а в комментарии - пальцы вверх',
//   'Здесь должна быть шутка, но мне не до шуток',
//   'Последнее фото на Земле...',
//   'Хэллоу, ворлд!',
//   'Моя первая фотография на яблокофон',
//   'Вот была бы функция с каруселью фотографий...',
//   'Красота под фильтрами',
//   'Расскажите про правила стильного фото',
//   'Привет, подписчики!',
//   'Я бы выбрал фильтр-кофе, а не фильтр кекстаграма',
//   'Ищу контент-менеджера!',
//   'Красиво жить не запретишь',
//   '25 идей для фото',
//   'Это целое искусство!',
// ];

// const MESSAGES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
// ];

// const NAMES = [
//   'Alfredo Linguini',
//   'Mr. Andersen',
//   'Antoine Ego',
//   'Babulita',
//   'Buzz Lightyear',
//   'Barbie',
//   'Becky',
//   'bingo bongo',
//   'Violetta Parr',
//   'Woody',
//   'Hector',
//   'Django',
//   'James P Sullivan',
//   'Jessie',
//   'Johnny Worthington',
//   'Doc Hudson',
//   'Dory',
//   'Dash Parr',
//   'Carl Fredricksen',
//   'Colette Tattoo',
//   'Queen Elinor',
//   'Mike Wazowski',
//   'Marlin',
//   'Merida',
//   'Miguel Rivera',
//   'Miss Tiny',
//   'Mister Incredible',
//   'Lightning McQueen',
//   'Mabel',
//   'Nemo',
//   'Auguste Gusteau',
//   'Peach',
//   'Bubble',
//   'Riley Andersen',
//   'Randall Boggs',
//   'Sally Carrera',
//   'Celia May',
//   'Scott Sleazely',
//   'Tiny',
//   'Terry and Terry Perry',
//   'Winston Devore',
//   'Finn McMissile',
//   'Holly DeLuxe',
//   'Horst',
//   'Hal',
//   'Charles Muntz',
//   'Chico Hicks',
//   'Evelyn Devor',
//   'Emil',
//   'Unicorn',
// ];

// //функция-генератор для получения случайного числа

// function getRandomInteger (min, max) {
//   const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//   const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// }

// //функция с логикой по поиску случайного элемента в переданном массиве

// const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// //функция-генератор для получения случайных ID из диапазона, без повтора, пока не будут перебраны все числа из промежутка

// function createRandomIdFromRangeGenerator (min, max) {
//   const previousValues = [];

//   return function () {
//     let currentValue = getRandomInteger(min, max);
//     if (previousValues.length >= (max - min + 1)) {
//       return null;
//     }
//     while (previousValues.includes(currentValue)) {
//       currentValue = getRandomInteger(min, max);
//     }
//     previousValues.push(currentValue);
//     return currentValue;
//   };
// }

// //Comment
// const generateCommentId = createRandomIdFromRangeGenerator(1, COMMENT_COUNT);

// const createCommentObject = () => ({
//   id: generateCommentId(), //работает
//   avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`, //работает
//   message: getRandomArrayElement(MESSAGES), //работает на 1 эл-т из массива
//   name: getRandomArrayElement(NAMES), //работает
// });

// console.log(
//   createCommentObject()
// );

// //генерация массива заданной длины. вторым аргументом передаем функцию createCommentObject,
// //результатами выполнения которой метод наполнит массив
// const similarComments = Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createCommentObject);

// console.log(similarComments);

// //функция-генератор для получения уникальных идентификаторов по порядку

// function createIdGenerator () {
//   let lastGeneratedId = 0;

//   return function () {
//     lastGeneratedId += 1;
//     return lastGeneratedId;
//   };
// }

// const generatePhotoId = createIdGenerator();

// //Photo

// const createPhotoObject = () => ({
//   id: generatePhotoId(), //работает по порядку
//   url: `photos/${generatePhotoId()}.jpg`, //underfined
//   description: getRandomArrayElement(DESCRIPTIONS), //работает, описание может повторяться
//   likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX), //работает
//   comments: similarComments,
// });

// console.log(
//   createPhotoObject()
// );

// //генерация массива заданной длины. вторым аргументом передаем функцию createPhotoObject,
// //результатами выполнения которой метод наполнит массив
// const similarPhotos = Array.from({length: PHOTO_COUNT}, createPhotoObject);

// console.log(similarPhotos);
