import React from 'react';
import PopupWithForm from './PopupWithForm';


function ConfirmDeletionPopup({isOpen, onClose, onConfirmDeletion}) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onConfirmDeletion()
    }

    return (
        <PopupWithForm
        name="checking"
        title="Вы уверены?"
        label="Подтвердить удаление"
        buttonText="Да"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
    />
    )
}

export default ConfirmDeletionPopup;