export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector('.elements__heart');
    const buttonTrash = this._element.querySelector('.elements__trash');
    buttonLike.addEventListener('click', () => {
      buttonLike.classList.toggle('elements__heart_active');
    });
    buttonTrash.addEventListener('click', () => {
      this._element.remove();
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__img');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.elements__place').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
