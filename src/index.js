//все импорты
import '../src/index.css';
import { cards} from './components/cards.js';
import { createCard, deleteCard, addLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';


// добавление карточек
const container = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = container.querySelector('.places__list');


cards.forEach(item => {
    placesList.append(createCard(cardTemplate, item.link, item.name, deleteCard, addLike, increaseCard))
  });

// работа с модальным окном редактирования профиля
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditOpen = document.querySelector('.profile__edit-button');
const popupProfileEditClose = popupProfileEdit.querySelector('.popup__close');
const formEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');

popupProfileEditOpen.addEventListener('click', () => {
    openPopup(popupProfileEdit);
  });
popupProfileEditClose.addEventListener('click', () => {
    closePopup(popupProfileEdit)
  });
const handleFormEditProfileSubmit = (evt) => {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    closePopup(popupProfileEdit)
};
formEdit.addEventListener('submit', handleFormEditProfileSubmit);

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
  const addNewCard = createCard(cardTemplate, placeLink, place, deleteCard, addLike, increaseCard);
  placesList.prepend(addNewCard);
  closePopup(popupNewCard);
  formCard.reset();
}; 
popupNewCardOpen.addEventListener('click', () => {
  openPopup(popupNewCard);
});
popupNewCardClose.addEventListener('click', () => {
  closePopup(popupNewCard)
});
formCard.addEventListener('submit', handleFormAddCardSubmit); 

const popupCard = document.querySelector('.popup_type_image');
const zoomImage = popupCard.querySelector('.popup__image');
const captionImage = popupCard.querySelector('.popup__caption');
const increaseCard = event => {
  openPopup(popupCard);
  zoomImage.setAttribute('src', event.target.src);
  zoomImage.setAttribute('alt', event.target.alt);
  captionImage.textContent = event.target.alt;
};













  