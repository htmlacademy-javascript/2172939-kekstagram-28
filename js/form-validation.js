import {isEscapeKey} from './util.js';

//регулярное выражение для проверки содержания хештега
const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_ERROR_TEXT = `Нельзя указать больше ${HASHTAG_MAX_COUNT} уникальных хэш-тегов, длиной не более 20 символов`;

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelFormButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

//создание экземпляра валидатора формы, в Pristine передаем объект с настройками
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

//показ формы редактирования изображения
const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//закрытие формы редактирования изображения
const closeModal = () => {
  form.reset();
  pristine.reset();

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

//нажатие на Esc закрывает форму редактирования изображения, если фокус не находится в поле ввода хэш-тега или комментария
const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

//обработчик закрытия формы редактирования через кнопку img-upload__cancel
function onCancelButtonClick (evt) {
  evt.preventDefault();
  closeModal();
}

//обработчик показа формы редактирования после выбора изображения с помощью контрола загрузки файла
function onFileInputChange (evt) {
  evt.preventDefault();
  openModal();
}

//проверка тегов на вадидность их символов, указанное кол-во тегов и уникальность. в коллекции Set уникальные значения из массива

const isValidTag = (tag) => HASHTAG_VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//value передает сама pristine
const validateTags = (value) => {
  const tags = value
    .trim().split(' ')
    .filter((tag) => tag.trim().length); //убирает лишние пробелы после 1.удаления концевых пробелов и 2.разделения строки
  return tags.every(isValidTag) && hasValidCount(tags) && hasUniqueTags(tags);
};

//валидатор для формы с хештегами. передаем поле, функцию и текст ошибки
pristine.addValidator(hashtagField, validateTags, HASHTAG_ERROR_TEXT);

//.validate возвращает true, если форма валидна
const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

//событие change, тк реакция с открытием окна на выбор файла
fileField.addEventListener('change', onFileInputChange);

cancelFormButton.addEventListener('click', onCancelButtonClick);

//обработчик на форму при отправке
form.addEventListener('submit', onFormSubmit);
