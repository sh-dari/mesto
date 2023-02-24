import {FormValidator} from './FormValidator.js';
import {validationConfig} from './constants.js';

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

const disableSubmitButton = (button) => {
  button.setAttribute("disabled", "disabled");
};

const enableSubmitButton = (button) => {
  button.removeAttribute("disabled", "disabled");
};

const removeValidationErrors = (items, itemErrors, validationConfig) => {
  items.forEach((el) => {
    el.classList.remove(validationConfig.inputErrorClass);
  });
  itemErrors.forEach((el) => {
    el.classList.remove(validationConfig.errorClass);
    el.textContent = '';
  });
};

formList.forEach(form => {
  new FormValidator(validationConfig, form).enableValidation();
});

export {disableSubmitButton, enableSubmitButton, removeValidationErrors};
