class FormValidator {
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._popupSelector = data.popupSelector;
    this._fieldsetSelector = data.fieldsetSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState(inputElement) {
    if (this._hasInvalidInput(inputElement)) {
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.removeAttribute("disabled", "disabled");
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.closest(this._formSelector).querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  }

  removeValidationErrors() {
    this._toggleButtonState();
    this._inputList.forEach((el) => {
      el.classList.remove(this._inputErrorClass);
      const itemError = this._form.querySelector(`.${el.id}-error`);
      itemError.classList.remove(this._errorClass);
      itemError.textContent = '';
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export {FormValidator};
