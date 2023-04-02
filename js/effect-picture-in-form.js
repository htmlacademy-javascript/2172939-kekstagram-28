const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
];
const DEFAULT_EFFECT = EFFECTS[0];
//актуальный эфф-т, начальное значение - первый объект, индекс 0
let chosenEffect = DEFAULT_EFFECT;

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsImage = document.querySelector('.effects');
const sliderEffect = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => sliderContainer.classList.remove('hidden');

//sliderEffect.noUiSlider.destroy() не отрабатывает
const hideSlider = () => sliderContainer.classList.add('hidden');

//метод .updateOptions() исп-ся для обновления слайдера
const updateSlider = () => {
  sliderEffect.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

//проверка на клик по с фильтрам. в массиве ищем name того фильтра, кот. выбрали с атрибутом value. перезапис.класс
const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

//актуальное значение слайдера получаем с помощью метода .get()
const onSliderUpdate = () => {
  const sliderValue = sliderEffect.noUiSlider.get();
  if (isDefault()) {
    imagePreview.style.filter = DEFAULT_EFFECT.style;
  } else {
    imagePreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectLevel.value = sliderValue;
};

//сбрасывает значение до none
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

//для отрисовки слайдера в noUiSlider передаем эл-т; min и max знач; шаг; старт знач и с какой стороны закраш-ть слайдер
noUiSlider.create(sliderEffect, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});
hideSlider();

effectsImage.addEventListener('change', onEffectsChange);

//слушатель события update вызывается при изменении положения слайдера
sliderEffect.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
