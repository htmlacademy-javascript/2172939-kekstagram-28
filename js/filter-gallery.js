const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterContainer = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

//случайная сортировка
const sortRandomly = () => pictures.slice().sort(() => Math.random() - 0.5).slice(0, PICTURES_COUNT);

//сортировка по кол-ву комментов (обсуждаемые). в порядке убывания b-a
const compareDiscussed = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
const sortDiscussed = () => pictures.slice().sort(compareDiscussed);

//ф-я, которая в зависимости от фильтра вызывает нужную функцию по фильтрации для текущего фильра
const getFiltredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return sortRandomly();
    case Filter.DISCUSSED:
      return sortDiscussed();
    default:
      return pictures;
  }
};

// обработчик изменение фильтров
const setOnFilterClick = (callback) => {
  filterContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterContainer
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFiltredPictures());
  });
};

//активирует фильтры
const init = (loadedPictures, callback) => {
  filterContainer.classList.remove('img-filters--inactive');
  pictures = loadedPictures.slice();
  setOnFilterClick(callback);
};

export {init, getFiltredPictures};
