const profilePopup = document.querySelector('.popup_for_profile');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const nameInput = profilePopupContainer.querySelector('.popup__item_el_name');
const jobInput = profilePopupContainer.querySelector('.popup__item_el_job');

const cardPopup = document.querySelector('.popup_for_card');
const cardPopupContainer = cardPopup.querySelector('.popup__container');
const placeInput = cardPopupContainer.querySelector('.popup__item_el_place');
const linkInput = cardPopupContainer.querySelector('.popup__item_el_link');

const imgPopup = document.querySelector('.popup_for_image');
const imgInput = imgPopup.querySelector('.popup__img');
const textInput = imgPopup.querySelector('.popup__text');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsContainer = document.querySelector('.elements__list');

const cardTemplate = document.querySelector('#item-template').content;
const cardElement = cardTemplate.querySelector('.elements__item');

const buttonsClose = document.querySelectorAll('.popup__close');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

function closePopup(element) {
  element.classList.remove('popup_opened');
}

function openPopup(element) {
  element.classList.add('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function openProfilePopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

function createCard(cardData) {
  const cloneCard = cardElement.cloneNode(true);
  const buttonLike = cloneCard.querySelector('.elements__heart');
  const buttonTrash = cloneCard.querySelector('.elements__trash');
  const imgCard = cloneCard.querySelector('.elements__img');
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
  cloneCard.querySelector('.elements__place').textContent = cardData.name;
  return cloneCard;
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({link: linkInput.value, name: placeInput.value}));
  cardPopupContainer.reset();
  closePopup(cardPopup);
}

buttonsClose.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  })
});

buttonEdit.addEventListener('click', openProfilePopup);

buttonAdd.addEventListener('click', () => {
  openPopup(cardPopup);
});

profilePopupContainer.addEventListener('submit', handleProfileFormSubmit);

cardPopupContainer.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(el => {
  cardsContainer.append(createCard(el));
});
