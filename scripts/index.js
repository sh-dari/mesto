let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let nameInput = popupContainer.querySelector('.popup__item_el_name');
let jobInput = popupContainer.querySelector('.popup__item_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let closeButton = popupContainer.querySelector('.popup__close');
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

popupContainer.addEventListener('submit', handleFormSubmit);
