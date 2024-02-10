const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const showInputError = ({formElement, inputElement, inputErrorClass, errorClass,  errorMessage}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  const hideInputError = ({formElement, inputElement, inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = ({formElement, inputElement, inputErrorClass, errorClass}) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity('');
      }

    if (!inputElement.validity.valid) {
      showInputError({formElement, inputElement,  inputErrorClass, errorClass, errorMessage: inputElement.validationMessage});
    } else {
      hideInputError({formElement, inputElement, inputErrorClass, errorClass});
    }
  };

  const setEventListeners = ({formElement, inputSelector, submitButtonSelector, inactiveButtonClass,inputErrorClass,  errorClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity({formElement, inputElement, inputErrorClass, errorClass});
        toggleButtonState({inputList, buttonElement, inactiveButtonClass});
      });
    });
  };

  const enableValidation = ({formElement, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    });

    setEventListeners({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass,  errorClass});
  }; 

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement)=> {
      return !inputElement.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    }
    else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };

  const clearValidation = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass,errorClass}
  ) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButtonElement = formElement.querySelector(submitButtonSelector);
  
    inputList.forEach((inputElement) => {hideInputError({formElement,inputElement, inputErrorClass,errorClass});
    });
  
    toggleButtonState({inputList, submitButtonElement, inactiveButtonClass});
  };

  export {enableValidation, clearValidation, validationConfig};