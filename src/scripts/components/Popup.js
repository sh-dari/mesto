export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseEscPopup = this._handleCloseEscPopup.bind(this._popup);
  }

  _handleCloseEscPopup(evt) {
    if (evt.key === 'Escape'){
      this.classList.remove('popup_opened');
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseEscPopup);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseEscPopup);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
