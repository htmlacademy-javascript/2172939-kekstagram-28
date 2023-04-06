import {getData, sendData} from './api.js';
import {renderGallery} from './gallery.js';
import {setOnFormSubmit, closeModal} from './form-validation.js';
import {createSuccessMessage, createErrorMessage} from './message.js';
import {showAlert} from './util.js';
import './form-validation.js';
import './scale-picture-in-form.js';
import './effect-picture-in-form.js';
import './upload-picture.js';

//для 11-2 вариант с промисами
// getData()
//   .then((pictures) => {
//     renderGallery(pictures);
//   })
//   .catch((err) => {
//     showAlert(err.message);
//   });
// setOnFormSubmit(closeModal);

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}

setOnFormSubmit (async (data) => {
  try {
    await sendData(data);
    closeModal();
    createSuccessMessage();
  } catch {
    createErrorMessage();
  }
});


// // //для 12-1 ретро
// import {showAlert, debounce} from './util.js';
// import {init, getFiltredPictures} from './filter-gallery.js';
// try {
//   const data = await getData();
//   const debouncedRenderGallery = debounce(renderGallery);
//   init(data, debouncedRenderGallery);
//   renderGallery(getFiltredPictures());
// } catch (err) {
//   showAlert(err.message);
// }
