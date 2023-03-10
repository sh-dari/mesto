import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._imgInput = this._popup.querySelector('.popup__img');
    this._textInput = this._popup.querySelector('.popup__text');
  }

  open(data) {
    this._imgInput.src = data.link;
    this._imgInput.alt = data.name;
    this._textInput.textContent = data.name;
    super.open();
  }
}
