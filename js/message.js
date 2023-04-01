import {isEscapeKey} from './util.js';
import {closeModal} from './form-validation.js';

//находим шаблоны #success и #error
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


//создаем соответствующие сообщения
const createSuccessMessage = () => {
  const successMessageClone = successMessageTemplate.cloneNode(true);
  document.body.append(successMessageClone);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  successMessageClone.addEventListener('click', onSuccessMessageClick);

  closeModal();
};

const createErrorMessage = () => {
  const errorMessageClone = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessageClone);

  document.addEventListener('keydown', onErrorMessageKeydown);
  errorMessageClone.addEventListener('click', onErrorMessageClick);
};

//исчезновение сообщений об успехе и об ошибке
const closeSuccessMessage = () => {
  const successMessageContainer = document.querySelector('.success');
  successMessageContainer.remove();

  document.removeEventListener('keydown', onSuccessMessageKeydown);
  successMessageContainer.removeEventListener('click', onSuccessMessageClick);
};

const closeErrorMessage = () => {
  const errorMessageContainer = document.querySelector('.error');
  errorMessageContainer.remove();

  document.removeEventListener('keydown', onErrorMessageKeydown);
  errorMessageContainer.removeEventListener('click', onErrorMessageClick);
};

//обработчики закрытия через Esc
function onSuccessMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}
function onErrorMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

//обработчики закрытия через кнопку и по клику на произвольную область экрана за пределами блока
function onSuccessMessageClick(evt) {
  evt.preventDefault();
  const successButton = document.querySelector('.success__button');
  const successBlock = document.querySelector('.success__inner');
  if(successButton.contains(evt.target) || !successBlock.contains(evt.target)) {
    closeSuccessMessage();
  }
}

function onErrorMessageClick(evt) {
  evt.preventDefault();
  const errorButton = document.querySelector('.error__button');
  const errorBlock = document.querySelector('.error__inner');
  if(errorButton.contains(evt.target) || !errorBlock.contains(evt.target)) {
    closeErrorMessage();
  }
}

export {createSuccessMessage, createErrorMessage};
