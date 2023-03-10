export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  popupSelector: '.popup',
  fieldsetSelector: '.popup__input-container',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}

const profilePopupSelector = document.querySelector('.popup_for_profile');
export const profilePopupContainer = profilePopupSelector.querySelector('.popup__container');
export const nameInput = profilePopupContainer.querySelector('.popup__item_el_name');
export const jobInput = profilePopupContainer.querySelector('.popup__item_el_job');

const cardPopupSelector = document.querySelector('.popup_for_card');
export const cardPopupContainer = cardPopupSelector.querySelector('.popup__container');
export const placeInput = cardPopupContainer.querySelector('.popup__item_el_place');
export const linkInput = cardPopupContainer.querySelector('.popup__item_el_link');

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
