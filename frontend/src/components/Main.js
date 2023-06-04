import { useContext } from 'react';
import Card from './Card';
import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onConfirmDelete, cards, onCardLike, email, signOut }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header>
                <p className="header__e-mail">{`${email}`}</p>
                <button className="header__exit-button" onClick={signOut}>Выйти</button>
            </Header>
            <main className="content page__content">
                <section className="profile">
                    <div className="profile__info-container">
                        <button className="profile__avatar-button" type="button" aria-label="Изменить аватар">
                            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" onMouseDown={onEditAvatar} />
                        </button>
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <p className="profile__discription">{currentUser.about}</p>
                            <button className="profile__edit-button profile__edit-button_profile" type="button"
                                aria-label="Изменить" onMouseDown={onEditProfile}>
                            </button>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="Добавить" onMouseDown={onAddPlace}>
                    </button>
                </section>

                <section className="grid">
                    <ul className="grid__elements">
                        {cards.map((card) => {
                            return (
                                <Card
                                    key={card._id}
                                    card={card}
                                    onCardClick={onCardClick}
                                    onConfirmDelete={onConfirmDelete}
                                    onCardLike={onCardLike}
                                />
                            )
                        })
                        }
                    </ul>
                </section>
            </main>
        </>
    )
}

export default Main;