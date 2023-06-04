class FormValidator {
    constructor(formValid, formElement) {
        this._formSelector = formValid.formSelector;
        this._inputSelector = formValid.inputSelector;
        this._submitButtonSelector = formValid.submitButtonSelector;
        this._inactiveButtonClass = formValid.inactiveButtonClass;
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputsList = [... this._formElement.querySelectorAll(this._inputSelector)]; //nodeList в массив
    }

    // функция проверки на валидность
    _checkInputValidity = (input) => {
        const error = document.querySelector(`#${input.id}-error`);
        if (input.validity.valid) {
            error.textContent = ''
        }
        else {
            error.textContent = input.validationMessage
        }
    }



    // функция включения и отключения кнопки сохранить
        _toggleSubmitButton = () => {
        const isFormValid = this._inputsList.every(input => {
            return input.validity.valid
        })
       
        if (isFormValid) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
        else {
            this._disactivateButtonState()
        }
    }
    

    // функция обработки всех форм и активации валидации
    _setEventListeners = () => {
        

        this._inputsList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                
                this._toggleSubmitButton();
            })
        })


    }

    _disactivateButtonState = (evt) => {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

     _hideError = (input) => {
        const error = document.querySelector(`#${input.id}-error`);
        error.textContent = ''
    }



    // //вызвать там, где навешиваем обраотчик открытия попапа
    resetValidation() {
        this._disactivateButtonState(); //<== управляем кнопкой
        this._inputsList.forEach((inputElement) => {
            this._hideError(inputElement) //<==очищаем ошибки
        });
        
    }


    enableValidation = () => {
        this._setEventListeners()
    }
}



export default FormValidator;