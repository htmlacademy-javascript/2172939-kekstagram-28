const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

// событие случится, когда пользователь выберет изображение для загрузки
//cвойство files — это структура, похожая на массив. выбираем только 1 файл, плучается у него индекс 0
//URL.createObjectURL() позволяет сделать ссылку на содержимое, а не ресурс на каком-то адресе


fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
