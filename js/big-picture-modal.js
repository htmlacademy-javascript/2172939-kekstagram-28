import './thumbnails.js';
import {isEscapeKey} from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const cancelBigPictureButton = document.querySelector('.big-picture__cancel');

//контейнер для заполнения данными комментария и сам шаблон
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

//для task2
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');

//создаем список комментариев под фото с данными
const fillCloneCommentData = (comment) => {
  const cloneComment = commentTemplate.cloneNode(true);

  cloneComment.querySelector('.social__picture').src = comment.avatar;
  cloneComment.querySelector('.social__picture').alt = comment.name;
  cloneComment.querySelector('.social__text').textContent = comment.message;

  return cloneComment;
};

//аналогично с renderThumbnails
const renderComments = (comments) => {
  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = fillCloneCommentData(comment);
    fragment.append(commentElement);
  });

  commentsList.append(fragment);
};

//заполнение окна данными
const renderPictureData = ({url, description, likes, comments}) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.big-picture__img img').alt = description;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.comments-count').textContent = comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
};

//закрытие модального окна с полноразмерным изображением

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');

  commentsCount.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');

  document.body.classList.remove('modal-open');

  cancelBigPictureButton.removeEventListener('click', onCancelBigPictureButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

//открытие модального окна с полноразмерным изображением

const openBigPicture = (data) => {
  bigPictureContainer.classList.remove('hidden');

  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  document.body.classList.add('modal-open');

  cancelBigPictureButton.addEventListener('click', onCancelBigPictureButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureData(data);
  renderComments(data.comments);
};

//обработчик закрытия через кнопку big-picture__cancel
function onCancelBigPictureButtonClick(evt) {
  evt.preventDefault();
  closeBigPicture();
}

//обработчик закрытия через Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
