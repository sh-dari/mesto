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

  _toggleLike() {
    this._buttonLike.classList.toggle('elements__heart_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleImageClick() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.elements__heart');
    this._buttonTrash = this._element.querySelector('.elements__trash');
    this._buttonLike.addEventListener('click', this._toggleLike.bind(this));
    this._buttonTrash.addEventListener('click', this._deleteCard.bind(this));
    this._image.addEventListener('click', this._handleImageClick.bind(this));
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
