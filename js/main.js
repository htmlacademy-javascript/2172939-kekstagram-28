import {getData, sendData} from './api.js';
import {renderGallery} from './gallery.js';
import {setOnFormSubmit, closeModal} from './form-validation.js';
import {createSuccessMessage, createErrorMessage} from './message.js';
import {showAlert} from './util.js';
import './form-validation.js';
import './scale-picture-in-form.js';
import './effect-picture-in-form.js';

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
