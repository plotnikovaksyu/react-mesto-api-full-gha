import React, { useEffect } from 'react';

function PopupWithForm({ name, title, children, state, label, buttonText, isOpen, onClose, onSubmit }) {

    function closePopupByOverlayClick(evt) {
        if (evt.target !== evt.currenTarget) {
            onClose(evt)
        }
    }

    return (
        <section className={`popup popup_${name} ${isOpen ? "popup_is-opened" : " "}`} onClick={closePopupByOverlayClick}>
            <div className={`popup__container popup__container_${name}`}>
                <button className="popup__close" type="button" aria-label="Закрыть без сохранения" onMouseDown={onClose}>
                </button>
                <h2 className="popup__title">{title}</h2>

                {/* <form className="popup__form" name={`${name}`} noValidate onSubmit={onSubmit}> */}
                <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
                    <fieldset className="popup__edit">
                        {children}
                        {/* <button type="submit"
                            className={`popup__submit-button popup__submit-button_${state} popup__submit-button_${name}`} disabled
                            aria-label={label}>{buttonText}</button> */}

                        <button type="submit"
                            className={`popup__submit-button  popup__submit-button_${name}`}
                            aria-label={label}>{buttonText}</button>

                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;