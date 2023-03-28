import Card from '../scripts/components/Card.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupDelete from '../scripts/components/PopupWithSubmit.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';
import {
  validationConfig,
  profilePopupContainer,
  cardPopupContainer,
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  avatarPopupContainer
} from '../scripts/utils/constants.js';
import './index.css';

const profileValidator = new FormValidator(validationConfig, profilePopupContainer);
const cardValidator = new FormValidator(validationConfig, cardPopupContainer);
const avatarValidator = new FormValidator(validationConfig, avatarPopupContainer);

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__job', avatarSelector: '.profile__avatar'});

const imgPopup = new PopupWithImage('.popup_for_image');
const popupDelete = new PopupDelete('.popup_for_delete');

const cardList = new Section(
  {renderer:(item) => {
    cardList.addItem(createCard(item));
  }},
  '.elements__list'
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'a356cdb4-b562-4193-8871-80b2cea38756',
    'Content-Type': 'application/json'
  }
});

api.getDataToLoadPage()
  .then(data => {
    const [ userData, initialCardsData ] = data;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserId(userData._id);
    cardList.renderItems(initialCardsData);
  })
  .catch((err) => {
    console.log(err);
  });

const createCard = (item) => {
  const card = new Card({
    data: item,
    userId: userInfo.getUserId(),
    handleCardClick: () => {
      imgPopup.open(item);
    },
    handleTrashClick: () => {
      popupDelete.changeHandleFormSubmit(()=>{
        api.deleteCard(card.getId())
          .catch((err) => {
            console.log(err);
          });
        card.deleteCard();
        popupDelete.close();
      });
      popupDelete.open();
    },
    handleLikeClick: () => {
      if (card.isLiked) {
        api.deleteLike(card.getId())
          .then((item) => {
            card.unsetLike();
            card.changeLikesCount(item);
          })
          .catch((err) => {
            console.log(err);
          });
      }else {
        api.addLike(card.getId())
          .then((item) => {
            card.setLike();
            card.changeLikesCount(item);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }},
    '#item-template'
  );
  const cardElement = card.generateCard();
  return cardElement
}

const profilePopup = new PopupWithForm(
  '.popup_for_profile',
  (formData) => {
    profilePopup.renderLoading(true);
    api.updateUserInfo(formData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  }
);

const popupChangeAvatar = new PopupWithForm(
  '.popup_for_avatar',
  (formData) => {
    popupChangeAvatar.renderLoading(true);
    api.changeAvatar(formData.link)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupChangeAvatar.renderLoading(false);
      });
  });

const cardPopup = new PopupWithForm(
  '.popup_for_card',
  (formData) => {
    cardPopup.renderLoading(true);
    api.addNewCard(formData)
    .then((cardData) => {
      cardList.addItemEnd(createCard(cardData));
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.renderLoading(false);
    });
  }
);

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();

profilePopup.setEventListeners();
imgPopup.setEventListeners();
popupDelete.setEventListeners();
popupChangeAvatar.setEventListeners();
cardPopup.setEventListeners();

buttonEdit.addEventListener('click', () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profileValidator.removeValidationErrors();
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  cardValidator.removeValidationErrors();
  cardPopup.open();
});

buttonChangeAvatar.addEventListener('click', () => {
  avatarValidator.removeValidationErrors();
  popupChangeAvatar.open();
});
