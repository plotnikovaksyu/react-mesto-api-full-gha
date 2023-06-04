import {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const placeRef = useRef();
    const linkRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            place: placeRef.current.value,
            link: linkRef.current.value,
        });
    }

    useEffect(() => {
        placeRef.current.value = ''
        linkRef.current.value = ''
    }, 
    [isOpen])

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            label="Сохранить"
            buttonText="Сохранить"
            state="disabled"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_place" id="input-place" type="text" name="place"
                required placeholder="Название" minLength="2" maxLength="30" ref={placeRef}  />
            <span id="input-place-error" className="popup__text-error"></span>
            <input className="popup__input popup__input_img" id="input-img" type="url" required name="img"
                placeholder="Ссылка на картинку" ref={linkRef}  />
            <span id="input-img-error" className="popup__text-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;