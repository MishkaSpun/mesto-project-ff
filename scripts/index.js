// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const buttonDelete = container.querySelector('.card__delete-button');

const createCard = (initialCards) =>  {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    cardImage.src = initialCards[i].link;
    cardImage.alt = initialCards[i].name;
  
    card.querySelector('.card__title').textContent = initialCards.name;
    
    return card;
  };
