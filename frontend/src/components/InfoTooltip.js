import positive from '../images/positive.svg';
import negative from '../images/negative.svg';

function InfoTooltip({ isOpen, onClose, successfullStatus, message }) {
    function closePopupByOverlayClick(evt) {
        if (evt.target !== evt.currenTarget) {
            onClose(evt)
        }
    }

    return (
        <section className={`popup ${isOpen ? "popup_is-opened" : " "}`} onClick={closePopupByOverlayClick}>
            <div className="popup__container">
                <button className="popup__close" type="button" aria-label="Закрыть без сохранения" onMouseDown={onClose}>
                </button>
                <div className="popup__info-tool-tip">
                    <img className="popup__icon" src={successfullStatus ? positive : negative}
                        alt={successfullStatus ? "Все прошло успешно" : "Что-то пошло не так! Попробуйте ещё раз"}
                    />
                    <h3 className="popup__message">{message}</h3>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip;