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
  nameInput,
  jobInput,
  cardPopupContainer,
  placeInput,
  linkInput,
  buttonEdit,
  buttonAdd
} from '../scripts/utils/constants.js';
import './index.css';

const profileValidator = new FormValidator(validationConfig, profilePopupContainer);
const cardValidator = new FormValidator(validationConfig, cardPopupContainer);

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__job'});

const imgPopup = new PopupWithImage('.popup_for_image');

const profilePopup = new PopupWithForm(
  '.popup_for_profile',
  (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({name: nameInput.value, link: jobInput.value});
    profilePopup.close();
  }
);

const cardList = new Section(
  {items: initialCards,
  renderer:(item) => {
    const card = new Card(item, '#item-template', () => {
      imgPopup.open(item);
    });
    cardList.addItem(card.generateCard());
  }},
  '.elements__list'
);

const cardPopup = new PopupWithForm(
  '.popup_for_card',
  (evt) => {
    evt.preventDefault();
    const data = {link: linkInput.value, name: placeInput.value};
    const card = new Card(data, '#item-template', () => {
      imgPopup.open(data);
    });
    cardList.addItemEnd(card.generateCard());
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
  const { name, link } = userInfo.getUserInfo();
  nameInput.value = name.textContent;
  jobInput.value = link.textContent;
  profileValidator.removeValidationErrors();
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  cardValidator.removeValidationErrors();
  cardPopup.open();
});
