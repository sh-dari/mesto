import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this._closeButton = this._popup.querySelector('.popup__close_for_delete');
    this._deleteButton = this._popup.querySelector('.popup__button_for_delete');
  }

  changeHandleFormSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
