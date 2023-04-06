const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const previewImage = document.querySelector('.img-upload__preview img');
const previewEffectsImages = document.querySelectorAll('.effects__preview');


// событие случится, когда пользователь выберет изображение для загрузки. URL.createObjectURL() позволяет сделать ссылку на содержимое

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }

  previewEffectsImages.forEach(
    (image) => {
      image.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
});


