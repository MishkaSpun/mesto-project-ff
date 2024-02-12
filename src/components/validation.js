// Функция отображения ошибки заполнения инпутов
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

// Функция проверки на валидность введённых данных
const isValid = (formElement, inputElement) => {
  // Не соответствует паттерну
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  // Пусто поле
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле.");
  } else {
    inputElement.setCustomValidity('');
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция добавления всем инпутам слушателя ошибки и переключателя кнопки
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция добавления setEventListeners всем формам
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Функция проверки валидности ВСЕХ инпутов в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция включения и отключения кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};

// Функция очистки валидации
const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector)

  inputList.forEach((input) => {
    hideInputError(formElement, input);
  })
  button.classList.add(config.inactiveButtonClass)
};
/*const showInputError = (config, errorMessage) => {
    const errorElement = config.formSelector.querySelector(`.${config.inputSelector.id}-error`);
    config.inputSelector.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

  const hideInputError = (config) => {
    const errorElement = config.formSelector.querySelector(`.${config.inputSelector.id}-error`);
    config.inputSelector.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = (config) => {
    if (config.inputSelector.validity.patternMismatch) {
      config.inputSelector.setCustomValidity(config.inputSelector.dataset.errorMessage);
      } else {
        config.inputSelector.setCustomValidity('');
      }

    if (!config.inputSelector.validity.valid) {
      showInputError(validationConfig, validationMessage);
    } else {
      hideInputError(validationConfig);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement, 'popup__button_disabled');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(validationConfig);
        toggleButtonState(inputList, buttonElement, 'popup__button_disabled');
      });
    });
  };

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement);
      /*formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    });

    setEventListeners(validationConfig);
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

  const clearValidation = (formElement, config
  ) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach(() => {
      hideInputError(validationConfig);
    });
  
    toggleButtonState(inputList, submitButtonElement, config.inactiveButtonClass);
  };*/

  export {enableValidation, clearValidation};