import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onConfirmDelete, onCardLike}) {

    const currentUser = useContext(CurrentUserContext);
    
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardDeleteButtonClassName = (
        `grid__delete-button ${isOwn ? 'grid__delete-button_visible' : 'grid__delete-button_hidden'}`
    )

    const cardLikeButtonClassName = (
        `grid__like-button ${isLiked ? 'grid__like-button_active' : " "}`
    )

    function handleClick() {
        onCardClick(card);
    }

    function confirmDeleteCard() {
        onConfirmDelete(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }


    return (
        <li className="grid__list">
            {/* <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button> */}
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={confirmDeleteCard}></button>
            <article className="grid__element">
                <img className="grid__image" src={card.link} alt={card.name} onMouseDown={handleClick} />
                <div className="grid__container">
                    <h2 className="grid__title">{card.name}</h2>
                    <div className="grid__like-container">
                        <button className={cardLikeButtonClassName} type="button" aria-label="Мне нравится" onClick={handleLikeClick}>
                        </button>
                        <p className="griid__counter">{card.likes.length}</p>
                    </div>
                </div>
            </article>
        </li>
    )
}
export default Card;