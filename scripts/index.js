const popups = document.querySelectorAll('.popup')

const profilePopup = document.querySelector('.popup_for_profile');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const nameInput = profilePopupContainer.querySelector('.popup__item_el_name');
const jobInput = profilePopupContainer.querySelector('.popup__item_el_job');
const profileInputs = profilePopup.querySelectorAll('.popup__item');
const profileInputErrors = profilePopup.querySelectorAll('.popup__item-error');

const cardPopup = document.querySelector('.popup_for_card');
const cardPopupContainer = cardPopup.querySelector('.popup__container');
const placeInput = cardPopupContainer.querySelector('.popup__item_el_place');
const linkInput = cardPopupContainer.querySelector('.popup__item_el_link');
const cardInputs = cardPopup.querySelectorAll('.popup__item');
const cardInputErrors = cardPopup.querySelectorAll('.popup__item-error');

const imgPopup = document.querySelector('.popup_for_image');
const imgInput = imgPopup.querySelector('.popup__img');
const textInput = imgPopup.querySelector('.popup__text');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#item-template').content;
const cardElement = cardTemplate.querySelector('.elements__item');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonSubmitCard = cardPopup.querySelector('.popup__button');
const buttonSubmitProfile = profilePopup.querySelector('.popup__button');

const handleCloseEscPopup = (evt) => {
  if (evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEscPopup);
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEscPopup);
}

function openProfilePopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function createCard(cardData) {
  const cloneCard = cardElement.cloneNode(true);
  const buttonLike = cloneCard.querySelector('.elements__heart');
  const buttonTrash = cloneCard.querySelector('.elements__trash');
  const imgCard = cloneCard.querySelector('.elements__img');
  const placeCard = cloneCard.querySelector('.elements__place');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__heart_active');
  });
  buttonTrash.addEventListener('click', () => {
    buttonTrash.closest('.elements__item').remove();
  });
  imgCard.addEventListener('click', () => {
    imgInput.src = cardData.link;
    imgInput.alt = cardData.name;
    textInput.textContent = cardData.name;
    openPopup(imgPopup);
  });
  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  placeCard.textContent = cardData.name;
  return cloneCard;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({link: linkInput.value, name: placeInput.value}));
  cardPopupContainer.reset();
  disableSubmitButton(buttonSubmitCard);
  closePopup(cardPopup);
}

initialCards.forEach(card => {
  cardsContainer.append(createCard(card));
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener('click', () => {
  enableSubmitButton(buttonSubmitProfile);
  removeValidationErrors(profileInputs, profileInputErrors, validationConfig);
  openProfilePopup();
});

buttonAdd.addEventListener('click', () => {
  cardPopupContainer.reset();
  removeValidationErrors(cardInputs, cardInputErrors, validationConfig);
  openPopup(cardPopup);
});

profilePopupContainer.addEventListener('submit', handleProfileFormSubmit);

cardPopupContainer.addEventListener('submit', handleCardFormSubmit);
