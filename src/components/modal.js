//.popup_is-opened 
const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    popup.addEventListener('mousedown', closeOverlay);
    popup.addEventListener('keydown', closeKeydown)
};

const closeOverlay = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget)
    }
};

//Проверить на новои ноуте esc
const closeKeydown = (event) => {
    if(event.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'))
    }
};

export {openPopup, closePopup}
