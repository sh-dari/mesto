let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__item_el_name');
let jobInput = formElement.querySelector('.popup__item_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let closeButton = formElement.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    let name = nameInput.value;
    let job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
