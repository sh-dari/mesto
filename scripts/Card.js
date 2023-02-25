import {imgPopup, imgInput, textInput} from './constants.js';
import {openPopup} from './index.js';

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
      imgInput.src = this._link;
      imgInput.alt = this._name;
      textInput.textContent = this._name;
      openPopup(imgPopup);
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

export {Card};
