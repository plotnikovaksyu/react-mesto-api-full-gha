import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState(' ');
    const [description, setDescription] = useState(' ');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            label="Сохранить"
            buttonText="Сохранить"
            state="disabled"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_name" id="input-name" type="text" name="name" required
                placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" value={`${name}`} onChange={evt => setName(evt.target.value)} />
            <span id="input-name-error" className="popup__text-error"></span>
            <input className="popup__input popup__input_discription" id="input-discription" type="text"
                name="about" required placeholder="Исследователь океана" minLength="2"
                maxLength="200" value={`${description}`} onChange={evt => setDescription(evt.target.value)} />
            <span id="input-discription-error" className="popup__text-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;