import { deleteOwnCard, putLike, deleteLike } from "./api";
const createCard = (template, data, deleteClick, likeClick, showClick) =>  {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const buttonDelete = card.querySelector('.card__delete-button');
    const buttonLike = card.querySelector('.card__like-button');
    const likeCount = card.querySelector('.card__like-number');
    let dataCardID = '';
    cardImage.src = data.link;
    cardImage.alt = data.name;
    dataCardID = data._id;
    data.likes.forEach((element) => {
      if (element._id === data.owner._id) {
        buttonLike.classList.add('card__like-button_is-active')
      } 
    });
    likeCount.textContent = data.likes.length;
    card.querySelector('.card__title').textContent = data.name;

    buttonLike.addEventListener('click',(evt) => {
      if (evt.target.classList.contains('card__like-button_is-active')) {
        likeClick (evt,dataCardID, likeCount);
      } else {
        likeClick (evt,dataCardID, likeCount);
      }
    })
    cardImage.addEventListener('click',() => showClick(data.name, data.link));
    if (data.owner._id === '8a8aa2caaebbeb636d562165') {
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
    if (evt.target.classList.contains('card__like-button_is-active')) {
      deleteLike(id)
      .then((data) => {
        evt.target.classList.remove('card__like-button_is-active');
        count.textContent = data.likes.length;
        })
      .catch((error) => console.log(error))
    } else {
      putLike(id)
      .then((data) => {
        evt.target.classList.add('card__like-button_is-active');
        count.textContent = data.likes.length;
      })
      .catch((error) => console.log(error))
    }
  };

  export {createCard, deleteCard, addLike};
