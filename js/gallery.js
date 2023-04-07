import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture-modal.js';

const thumbnailContainer = document.querySelector('.pictures');

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  openBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  thumbnailContainer.addEventListener('click', onContainerClick);
  renderThumbnails(pictures);
};

export {renderGallery};
