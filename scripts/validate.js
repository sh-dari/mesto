import {FormValidator} from './FormValidator.js';
import {validationConfig} from './constants.js';

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

const disableSubmitButton = (button) => {
  button.setAttribute("disabled", "disabled");
};

const enableSubmitButton = (button) => {
  button.removeAttribute("disabled", "disabled");
};

formList.forEach(form => {
  new FormValidator(validationConfig, form).enableValidation();
});

export {disableSubmitButton, enableSubmitButton};
