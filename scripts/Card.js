const imgPopup = document.querySelector('.popup_for_image');
const imgInput = imgPopup.querySelector('.popup__img');
const textInput = imgPopup.querySelector('.popup__text');

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return cardElement;
  }

  _handleCloseEscPopup (evt) {
    if (evt.key === 'Escape'){
      imgPopup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleCloseEscPopup);
    }
  }

  _openImgPopup() {
    imgPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseEscPopup);
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector('.elements__heart');
    const buttonTrash = this._element.querySelector('.elements__trash');
    const imgCard = this._element.querySelector('.elements__img');
    buttonLike.addEventListener('click', () => {
      buttonLike.classList.toggle('elements__heart_active');
    });
    buttonTrash.addEventListener('click', () => {
      buttonTrash.closest('.elements__item').remove();
    });
    imgCard.addEventListener('click', () => {
      imgInput.src = this._link;
      imgInput.alt = this._name;
      textInput.textContent = this._name;
      this._openImgPopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__img').alt = this._name;
    this._element.querySelector('.elements__place').textContent = this._name;

    return this._element;
  }
}

export {Card};
