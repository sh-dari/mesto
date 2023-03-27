export default class Card {
  constructor({ data, handleCardClick, handleTrashClick, handleLikeClick, userId }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return cardElement;
  }

  _handleImageClick() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.elements__heart');
    this._buttonTrash = this._element.querySelector('.elements__trash');
    this._buttonLike.addEventListener('click', this._handleLikeClick.bind(this));
    this._buttonTrash.addEventListener('click', this._handleTrashClick.bind(this));
    this._image.addEventListener('click', this._handleImageClick.bind(this));
  }

  _isUserHasLiked() {
    return this._likes.filter(like => like._id == this._userId).length != 0
  }

  setLike() {
    this._buttonLike.classList.add('elements__heart_active');
    this.isLiked = true;
  }

  unsetLike() {
    this._buttonLike.classList.remove('elements__heart_active');
    this.isLiked = false;
  }

  toggleButtonState() {
    if (this._isUserHasLiked()) {
      this.setLike();
    }else {
      this.unsetLike();
    }
  }

  changeLikesCount(data) {
    this._likesCount.textContent = data.likes.length;
  }

  deleteCard() {
    this._element.remove();
  }

  getId() {
    return this._id
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__img');
    this._likesCount = this._element.querySelector('.elements__like-count');

    this._element.querySelector('.elements__place').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesCount.textContent = this._likes.length;

    this._setEventListeners();

    this.toggleButtonState();

    if (this._owner._id !== this._userId) {
      this._buttonTrash.remove();
    }

    return this._element;
  }
}
