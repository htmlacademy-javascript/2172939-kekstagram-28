/*
Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее. Эта функция нам пригодится для валидации формы.
*/

const checkStringLength = (string, length) => string.length <= length;

checkStringLength('javascript', 10);

/*
Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза,
которые одинаково читаются и слева направо и справа налево.
Перевернуть строку и сравнить, равна ли исходная строка перевернутой строке или нет.
Если строки найдены равными, мы можем сказать, что данная строка является палиндромом
*/

const isPalindrom = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');

  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }

  return tempString === reverseString;
};

isPalindrom('топот');

/*
Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их
в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
*/

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }

  return parseInt(result, 10);
};

extractNumber('2023 год');

/*
Функция, которая принимает три параметра: исходную строку, минимальную длину и строку
с добавочными символами — и возвращает исходную строку, дополненную указанными символами
до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину,
она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
Эта функция нам пригодится для формирования адресов файлов.
*/

const myPadStart = (string, minLength, pad) => {
  let result = string;
  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength ? pad : pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }
  return result;
};

myPadStart('qwerty', 4, '0');
