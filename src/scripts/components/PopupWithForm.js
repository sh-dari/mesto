import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitter) {
    super(popupSelector);
    this._submitter = submitter;
    this._form = this._popup.querySelector('.popup__container')
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitter);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
