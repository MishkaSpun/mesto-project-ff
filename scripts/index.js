// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


const createCard = (link, name, deleteClick) =>  {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const buttonDelete = card.querySelector('.card__delete-button');
    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__title').textContent = name;
    buttonDelete.addEventListener('click', deleteClick);
    return card;
  };

  const deleteCard = event => {
    event.target.closest('.card').remove()
  }

  initialCards.forEach(item => {
    placesList.append(createCard(item.link, item.name, deleteCard))
  })