import {handleInput} from './modal.min.js';
import './accordions.min.js';

const checkboxLabels = document.querySelectorAll('input[type="checkbox"]+label');
const feedbackPhoneInput = document.querySelector('.feedback input[type="tel"]');

checkboxLabels.forEach((label) => {
  label.addEventListener('keydown', (evt) => {
    if (evt.key === ' ') {
      evt.preventDefault();
      evt.target.click();
    }
  });
});

feedbackPhoneInput.addEventListener('input', (evt) => {
  handleInput(evt.target);
});
