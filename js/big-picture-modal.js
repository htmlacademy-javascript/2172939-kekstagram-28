import './thumbnails.js';
import {isEscapeKey} from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const openBigPicture = document.querySelector('.picture');
const closeBigPicture = document.querySelector('.big-picture__cancel');

//контейнер для заполнения данными комментария и сам шаблон
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList
  .content
  .querySelector('.social__comment'); //вместо id взят список комментариев - правильно ли это?

const commentsCount = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');


//создаем список комментариев под фото
const createCloneComment = ({avatar, name, message}) => {
  const cloneComment = commentTemplate.cloneNode(true);

  cloneComment.querySelector('.social__picture').src = avatar;
  cloneComment.querySelector('.social__picture').alt = name;
  cloneComment.querySelector('.social__text').textContent = message;

  return cloneComment;
};

createCloneComment();

//заполнение окна данными
const fillPictureData = (photo) => {
  bigPictureContainer.querySelector('big-picture__img').querySelector('img').src = photo.url;
  bigPictureContainer.querySelector('.likes-count').textContent = photo.likes;
  bigPictureContainer.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = photo.description;
};

fillPictureData();

//обработчик закрытия через Esc, чтобы передать его в addEventListener и removeEventListener
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//открытие и закрытие модального окна с полноразмерным изображением
openBigPicture.addEventListener('click', () => {
  bigPictureContainer.classList.remove('hidden');

  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
});

closeBigPicture.addEventListener('click', () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
});
