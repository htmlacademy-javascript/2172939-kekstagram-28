import './thumbnails.js';
import {isEscapeKey} from './util.js';

const COMMENTS_PORTION = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const cancelBigPictureButton = document.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');

let commentsShown = 0;
let comments = [];

//контейнер для заполнения данными комментария и сам шаблон
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

//создаем список комментариев под фото с данными
const fillCloneCommentData = (comment) => {
  const cloneComment = commentTemplate.cloneNode(true);

  cloneComment.querySelector('.social__picture').src = comment.avatar;
  cloneComment.querySelector('.social__picture').alt = comment.name;
  cloneComment.querySelector('.social__text').textContent = comment.message;

  return cloneComment;
};

//
const renderComments = () => {
  commentsShown += COMMENTS_PORTION;

  if(commentsShown >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = fillCloneCommentData(comments[i]);
    fragment.append(commentElement);
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

//заполнение окна данными
const renderPictureData = ({url, description, likes}) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.big-picture__img img').alt = description;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
};

//закрытие модального окна с полноразмерным изображением

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');

  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);

  cancelBigPictureButton.removeEventListener('click', onCancelBigPictureButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  commentsShown = 0;
};

//открытие модального окна с полноразмерным изображением

const openBigPicture = (data) => {
  bigPictureContainer.classList.remove('hidden');

  document.body.classList.add('modal-open');

  commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);

  cancelBigPictureButton.addEventListener('click', onCancelBigPictureButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureData(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
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

//обработчик клика по "загрузить еще"
function onCommentsLoaderButtonClick(evt) {
  evt.preventDefault();
  renderComments();
}

export {openBigPicture};
