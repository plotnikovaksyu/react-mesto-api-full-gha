import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    useEffect(() => {
        avatarRef.current.value = ''
    }, 
    [isOpen])

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            label="Сохранить"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            state="disabled"
            onSubmit={handleSubmit}>
            <input className="popup__input popup__input_avatar" id="input-avatar" type="url" required
                name="avatar" placeholder="Ссылка на аватар" ref={avatarRef} />
            <span id="input-avatar-error" className="popup__text-error"></span>
        </PopupWithForm>

    )
}

export default EditAvatarPopup;