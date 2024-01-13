
const createCard = (template,link, name, deleteClick, likeClick, showClick) =>  {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const buttonDelete = card.querySelector('.card__delete-button');
    const buttonLike = card.querySelector('.card__like-button');
    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__title').textContent = name;
    buttonDelete.addEventListener('click', deleteClick);
    buttonLike.addEventListener('click', likeClick);
    cardImage.addEventListener('click', showClick);
    return card;
  };

  const deleteCard = event => {
    event.target.closest('.card').remove()
  };

  const addLike = event => {
    event.target.classList.toggle('card__like-button_is-active');
  };

  
  
  export {createCard, deleteCard, addLike};
