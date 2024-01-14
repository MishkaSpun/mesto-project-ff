
const createCard = (template,cardLink, cardName, deleteClick, likeClick, showClick) =>  {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const buttonDelete = card.querySelector('.card__delete-button');
    const buttonLike = card.querySelector('.card__like-button');
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    card.querySelector('.card__title').textContent = cardName;
    buttonDelete.addEventListener('click', deleteClick);
    buttonLike.addEventListener('click', likeClick);
    cardImage.addEventListener('click',() => showClick(cardName, cardLink));
    return card;
  };

  const deleteCard = event => {
    event.target.closest('.card').remove()
  };
  const addLike = event => {
    event.target.classList.toggle('card__like-button_is-active');
  };
  export {createCard, deleteCard, addLike};
