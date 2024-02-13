
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity('Вы пропустили это поле.');
    } else {
      inputElement.setCustomValidity('');
    }
    
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement)=> {
      return !inputElement.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add('popup__button_disabled');
    }
    else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_disabled');
    }
  };

  const clearValidation = (formElement, config
  ) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach((input) => {
      hideInputError(formElement, input);
    });
  
    submitButtonElement.classList.add(config.inactiveButtonClass)
  };

  export {enableValidation, clearValidation};