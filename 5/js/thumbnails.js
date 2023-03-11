import {getPictures} from './data.js';

//контейнер для отрисовки нового дом
const thumbnailContainer = document.querySelector('.pictures');

//получаем шаблон
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//получаем массив похожих миниатюр при помощи импортируемого модуля для генерации данных
const getSimilarThumbnails = getPictures();

//коробочка для данных
const getSimilarThumbnailsFragment = document.createDocumentFragment();

//данные передаем в шаблон. для каждого элемента в массиве клонируем шаблон похожих миниатюр и отрисовываем
getSimilarThumbnails.forEach((picture) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = picture.url;
  newThumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
  newThumbnail.querySelector('.picture__likes').textContent = picture.likes;
  newThumbnail.querySelector('.picture__img').alt = picture.description;

  getSimilarThumbnailsFragment.appendChild(newThumbnail);
});

const renderThumbnail = () => thumbnailContainer.appendChild(getSimilarThumbnailsFragment);

export{renderThumbnail};
