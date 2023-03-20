//контейнер для отрисовки нового дом
const thumbnailContainer = document.querySelector('.pictures');

//получаем шаблон
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//данные передаем в шаблон и получаем одну миниатюру
const createThumbnail = ({url, comments, likes, description, id}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

//для каждого элемента в массиве получаем шаблон похожих миниатюр и отрисовываем. данные хранятся в кробочке fragment
const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  thumbnailContainer.append(fragment);
};

export{renderThumbnails};
