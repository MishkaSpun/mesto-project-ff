import { deleteOwnCard, putLike, deleteLike } from "./api";
const createCard = (template, data, deleteClick, likeClick, showClick, userId) =>  {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const buttonDelete = card.querySelector('.card__delete-button');
    const buttonLike = card.querySelector('.card__like-button');
    const likeCount = card.querySelector('.card__like-number');
    const dataCardID = data._id;
    cardImage.src = data.link;
    cardImage.alt = data.name;
    
    data.likes.some((element) => {
      if (element._id === data.owner._id) {
        buttonLike.classList.add('card__like-button_is-active')
      } 
    });

    
    likeCount.textContent = data.likes.length;
    card.querySelector('.card__title').textContent = data.name;

    buttonLike.addEventListener('click',(evt) => {
        likeClick (evt,dataCardID, likeCount);
      }
    );

    cardImage.addEventListener('click',() => showClick(data.name, data.link));
    if (data.owner._id === userId) {
      buttonDelete.addEventListener('click',  (evt) => deleteClick (evt, dataCardID));
    } else {buttonDelete.setAttribute('hidden', true)}
    return card;
  };

  const deleteCard = (event, id) => {
    deleteOwnCard(id).then(()=> {
    event.target.closest('.places__item').remove();
  })
  };

  const addLike = (evt, id, count) => {
    const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? deleteLike : putLike;
    likeMethod(id)
    .then((data) => {
      evt.target.classList.toggle('card__like-button_is-active'); 
      count.textContent = data.likes.length;
    })
    .catch(err => console.log(err));
  };

  export {createCard, deleteCard, addLike};