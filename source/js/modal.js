const page = document.querySelector('.page');
const modalContainer = document.querySelector('.modal');
const modalCloseButton = modalContainer.querySelector('.modal button[type="reset"]');
const openButtons = document.querySelectorAll('.callback-button');
const phoneInput = modalContainer.querySelector('.modal input[type="tel"]');
const nameField = modalContainer.querySelector('input[type="text"]');

const NUMBER_EXPRESSION = /[0-9]/;

const checkIfEscape = (evt) => evt.key === 'esc' || evt.key === 'Escape';
const checkIfTab = (evt) => evt.key === 'Tab';


const showModal = () => {
  page.classList.add('page--with-modal');
  modalContainer.classList.add('modal--opened');
  nameField.focus();
};

const closeModal = () => {
  page.classList.remove('page--with-modal');
  modalContainer.classList.remove('modal--opened');
};

modalContainer.addEventListener('click', (evt) => {
  switch (true) {
    case evt.target === modalCloseButton:
      closeModal();
      break;
    case evt.target === modalContainer:
      modalCloseButton.click();
  }
});

openButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    showModal();
  });
});


document.addEventListener('keydown', (evt) => {
  if (checkIfEscape(evt)) {
    evt.preventDefault();
    modalCloseButton.click();
  }
});

phoneInput.addEventListener('input', (evt) => {
  handleInput(evt.target);
});

const getCodeFrom = (string) => {
  const sliced = string.slice(1, 4);
  return sliced ? `(${sliced}` : '';
};

const getFirstNumber = (string) => {
  const sliced = string.slice(0, 1);
  return sliced ? `+${sliced}` : '+';
};

const getNumber = (string) => {
  const sliced = string.slice(4, 11);
  return sliced ? `)${sliced}` : '';
};

const handleInput = (input) => {
  let clearString = [...input.value].filter((char) => NUMBER_EXPRESSION.test(char)).join('');
  if (clearString.length === 1 && clearString[0] !== '7') {
    clearString = '7' + clearString;
  }
  const finalString = `${getFirstNumber(clearString)}${getCodeFrom(clearString)}${getNumber(clearString)}`;
  input.value = input.value !== '' ? finalString : '';
};

const isShiftKey = (evt) => evt.shiftKey;

document.addEventListener('keydown', (evt) => {
  if (checkIfTab(evt)) {
    if (document.activeElement === modalCloseButton && !isShiftKey(evt)) {
      evt.preventDefault();
      nameField.focus();
    }

    if (isShiftKey(evt) && document.activeElement === nameField) {
      evt.preventDefault();
      modalCloseButton.focus();
    }
  }
});

export {handleInput};
