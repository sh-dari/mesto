const initialCards = [
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
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.popup__item_el_name');
const jobInput = popupContainer.querySelector('.popup__item_el_job');
const popupCard = document.querySelector('.popup_for_card');
const popupCardContainer = popupCard.querySelector('.popup__container');
const placeInput = popupCardContainer.querySelector('.popup__item_el_place');
const linkInput = popupCardContainer.querySelector('.popup__item_el_link');
const popupImg = document.querySelector('.popup_for_image');
const imgInput = popupImg.querySelector('.popup__img');
const textInput = popupImg.querySelector('.popup__text');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elements = document.querySelector('.elements__list');

const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

function closePopup(element) {
  element.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  })
});

function openPopup(element) {
  element.classList.add('popup_opened');
}

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popup);
});

addButton.addEventListener('click', () => {
  openPopup(popupCard);
});

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popup);
}

popupContainer.addEventListener('submit', handleFormSubmit);

function addElement(imageValue, placeValue) {
  const itemTemplate = document.querySelector('#item-template').content;
  const itemElement = itemTemplate.querySelector('.elements__item').cloneNode(true);
  itemElement.querySelector('.elements__heart').addEventListener('click', evt => {
    evt.target.classList.toggle('elements__heart_active');
  });
  itemElement.querySelector('.elements__trash').addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });
  itemElement.querySelector('.elements__img').addEventListener('click', () => {
    imgInput.src = imageValue;
    textInput.textContent = placeValue;
    openPopup(popupImg);
  });
  itemElement.querySelector('.elements__img').src = imageValue;
  itemElement.querySelector('.elements__place').textContent = placeValue;
  return itemElement;
}

function cardFormSubmit (evt) {
  evt.preventDefault();
  elements.prepend(addElement(linkInput.value, placeInput.value));
  placeInput.value = '';
  linkInput.value = '';
  closePopup(popupCard);
}

popupCardContainer.addEventListener('submit', cardFormSubmit);

initialCards.forEach(el => {
  elements.append(addElement(el.link, el.name));
});
