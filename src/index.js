//все импорты
import '../src/index.css';
import { cards} from './components/cards.js';
import { createCard, deleteCard, addLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import { getCard, getUserInfo, patchUserInfo, patchAvatar, postNewCard} from './components/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// добавление карточек и увеличение картинок
const container = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = container.querySelector('.places__list');

const popupCard = document.querySelector('.popup_type_image');
const zoomImage = popupCard.querySelector('.popup__image');
const captionImage = popupCard.querySelector('.popup__caption');
const popupCardClose =popupCard.querySelector('.popup__close');

const increaseCard = (name, link
  ) => {
  openPopup(popupCard);
  zoomImage.setAttribute('src', link);
  zoomImage.setAttribute('alt', name);
  captionImage.textContent = name;
};
popupCardClose.addEventListener('click', () => {closePopup(popupCard)});

Promise.all([getCard(), getUserInfo()])
.then (([listCard, users]) => {
  listCard.forEach((element) => {
    placesList.append(createCard(cardTemplate, element, deleteCard, addLike, increaseCard))
  });
})

// работа с модальным окном редактирования профиля
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditOpen = document.querySelector('.profile__edit-button');
const popupProfileEditClose = popupProfileEdit.querySelector('.popup__close');
const formEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

popupProfileEditOpen.addEventListener('click', () => {
    clearValidation(formEdit, validationConfig);
    openPopup(popupProfileEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  });
popupProfileEditClose.addEventListener('click', () => {
    closePopup(popupProfileEdit)
  });
const handleFormEditProfileSubmit = (evt) => {
    evt.preventDefault();
    patchUserInfo(nameInput,jobInput)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    closePopup(popupProfileEdit);
    formEdit.reset();
};

formEdit.addEventListener('submit', handleFormEditProfileSubmit);

//работа с модальным окном редактирования аватара
const popupAvatarEdit = document.querySelector('.popup_type_avatar');
const avatar = document.querySelector('.profile__image');
const popupAvatarEditOpen = document.querySelector('.profile__image_cover');
const popupAvatarEditClose = popupAvatarEdit.querySelector('.popup__close');
const formAvatar = document.querySelector('form[name="newAvatar"]');
const avatarLinkInput = formAvatar.querySelector('.popup__input_type_url');
popupAvatarEditOpen.addEventListener('click', () => {
  clearValidation(formEdit, validationConfig);
  openPopup(popupAvatarEdit);
  formAvatar.reset();
});
popupAvatarEditClose.addEventListener('click', () => {
  closePopup(popupAvatarEdit);
});
const handleFormEditAvatarSubmit = (evt) => {
  evt.preventDefault();
  const linkValue = avatarLinkInput.value;
  avatar.style.backgroundImage = linkValue;
  patchAvatar(linkValue)
  .then((res)=> {
    avatar.style.backgroundImage = `url('${res.avatar}')`;
    closePopup(popupAvatarEdit);})
};

popupAvatarEdit.addEventListener('submit', handleFormEditAvatarSubmit);


 
//работа с модальным окном добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpen = document.querySelector('.profile__add-button');
const popupNewCardClose = popupNewCard.querySelector('.popup__close');
const formCard = document.querySelector('form[name="new-place"]');
const placeInput = formCard.querySelector('.popup__input_type_card-name');
const linkInput = formCard.querySelector('.popup__input_type_url');

const handleFormAddCardSubmit = (evt) => {
  evt.preventDefault();
  const place = placeInput.value;
  const placeLink = linkInput.value;
  postNewCard(place, placeLink)
  .then((elem) => {
    const addNewCard = createCard(cardTemplate, elem, getCard, deleteCard, addLike, increaseCard);
    placesList.prepend(addNewCard);
    closePopup(popupNewCard);
    formCard.reset();
  })
  .catch((error) => {
    console.log(error)})
}; 
popupNewCardOpen.addEventListener('click', () => {
  openPopup(popupNewCard);
  clearValidation(formCard, validationConfig);
});
popupNewCardClose.addEventListener('click', () => {
  closePopup(popupNewCard)
});
formCard.addEventListener('submit', handleFormAddCardSubmit);

//валидация
enableValidation(validationConfig); 

getUserInfo().then((data) =>{
  profileDescription.textContent = data.about;
  profileTitle.textContent = data.name;

}
)

