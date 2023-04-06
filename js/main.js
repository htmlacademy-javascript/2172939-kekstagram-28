import {getData} from './api.js';
import {renderGallery} from './gallery.js';
import {setOnFormSubmit, closeModal} from './form-validation.js';
import {init, getFiltredPictures} from './filter-gallery.js';
import {showAlert, debounce} from './util.js';
import './scale-picture-in-form.js';
import './effect-picture-in-form.js';
import './upload-picture.js';

getData()
  .then((data) => {
    const debouncedRenderGallery = debounce(renderGallery);
    init(data, debouncedRenderGallery);
    renderGallery(getFiltredPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  });

setOnFormSubmit(closeModal);
