const showInputError = (formElement, inputElement, errorMessage, classes) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classes.inputErrorClass);
  errorElement.classList.add(classes.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, classes) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classes.inputErrorClass);
  errorElement.classList.remove(classes.errorClas);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

const checkInputValidity = (formElement, inputElement, classes) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classes);
  } else {
    hideInputError(formElement, inputElement, classes);
  }
};

const setEventListeners = (formElement, classes) => {
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
  const buttonElement = formElement.closest(classes.formSelector).querySelector(classes.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classes);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (classes) => {
  const formList = Array.from(document.querySelectorAll(classes.formSelector));
  formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll(classes.fieldsetSelector))
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, classes);
    });
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  popupSelector: '.popup',
  fieldsetSelector: '.popup__input-container',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
});
