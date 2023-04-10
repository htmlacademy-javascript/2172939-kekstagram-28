const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const PERCENT_TO_FRACTION = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const previewPicture = document.querySelector('.img-upload__preview img');

//изображению добавляться стиль CSS, который с помощью трансформации scale задаёт масштаб
const scalePicture = (value) => {
  previewPicture.style.transform = `scale(${value / PERCENT_TO_FRACTION})`;
  scaleInput.value = `${value}%`;
};

//обработчики клика по кнопкам 'меньше' и 'больше'

const onSmallerButtonClick = (evt) => {
  evt.preventDefault();
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scalePicture(newValue);
};

const onBiggerButtonClick = (evt) => {
  evt.preventDefault();
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scalePicture(newValue);
};

//сбрасывает значение до масштаба по умолчанию
const resetScale = () => scalePicture(DEFAULT_SCALE);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export{resetScale};
