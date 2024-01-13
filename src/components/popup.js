//работа с модальным окном увеличения карточки
const popupCard = document.querySelector('.popup_type_image');
const zoomImage = popupCard.querySelector('.popup__image');
const captionImage = popupCard.querySelector('.popup__caption');
const popupCardClose = popupCard.querySelector('.popup__close');
const increaseCard = showCard(popupCard, zoomImage, captionImage );
popupCardClose.addEventListener('click', closePopup(popupCard));

cardImage.addEventListener('click',showClick)

function showCard(popup, popupImage, imageCaption) {
    openPopup(popup);
    popupImage.setAttribute("src", evt.target.src);
    popupImage.setAttribute("alt", evt.target.alt);
    imageCaption.textContent = evt.target.alt;
}
