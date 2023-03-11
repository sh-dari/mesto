import Card from '../scripts/components/Card.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
  initialCards,
  validationConfig,
  profilePopupContainer,
  cardPopupContainer,
  buttonEdit,
  buttonAdd
} from '../scripts/utils/constants.js';
import './index.css';

const profileValidator = new FormValidator(validationConfig, profilePopupContainer);
const cardValidator = new FormValidator(validationConfig, cardPopupContainer);

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__job'});

const imgPopup = new PopupWithImage('.popup_for_image');

const createCard = (item) => {
  const card = new Card(item, '#item-template', () => {
    imgPopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement
}

const profilePopup = new PopupWithForm(
  '.popup_for_profile',
  (formData) => {
    userInfo.setUserInfo(formData);
    profilePopup.close();
  }
);

const cardList = new Section(
  {items: initialCards,
  renderer:(item) => {
    cardList.addItem(createCard(item));
  }},
  '.elements__list'
);

const cardPopup = new PopupWithForm(
  '.popup_for_card',
  (formData) => {
    cardList.addItemEnd(createCard(formData));
    cardPopup.close();
  }
);

cardList.renderItems();

profileValidator.enableValidation();
cardValidator.enableValidation();

profilePopup.setEventListeners();
cardPopup.setEventListeners();
imgPopup.setEventListeners();

buttonEdit.addEventListener('click', () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profileValidator.removeValidationErrors();
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  cardValidator.removeValidationErrors();
  cardPopup.open();
});
