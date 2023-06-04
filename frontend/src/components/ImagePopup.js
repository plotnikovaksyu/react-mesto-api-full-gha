function ImagePopup({ card, onClose }) { 
    function closePopupByOverlayClick(evt) {
        if (evt.target !== evt.currenTarget) {
            onClose(evt)
        }
    }
    return (
        <section className={`popup popup_img ${(Object.entries(card).length > 0) && "popup_is-opened"}`} onClick={closePopupByOverlayClick}>
            <div className="popup__box">
                <button className="popup__close popup__close_img" type="button" aria-label="Закрыть без сохранения" onClick={onClose}>
                </button>
                <img className="popup__img" src={card.link} alt={card.name} />
                <h2 className="popup__title popup__title_img">{card.name}</h2>
            </div>
        </section>
    )
}

export  default ImagePopup;