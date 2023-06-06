import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletionPopup from './ConfirmDeletionPopup';
import Register from './Register';
import Login from './Login';
import PageNotFound from './PageNotFound';
import { api } from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({})

    const [loggedIn, setLoggedIn] = useState(false);


    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isRegistrationMessage, setIsRegistrationMessage] = useState({});
    const [email, setEmail] = useState(' ');

    const navigate = useNavigate();

    //отрисовать все карточки после авторизации & обновить стейт с инфой юзера
    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserData(), api.getInitialCards()])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData)
                    setCards(cardsData)
                })
                .catch((err) => {
                    console.log((`${err}`))
                })
        }
    }, [loggedIn])


    // поставить и удалить лайк
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (isLiked) {
            api.deleteLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                    setCards(newCards)
                })
                .catch((err) => {
                    console.log((`${err}`))
                })
        }
        else
            api.setLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                    setCards(newCards)
                })
                .catch((err) => {
                    console.log((`${err}`))
                })
    }

    //удалить карточку
    function handleCardDelete() {

        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards)
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }

    function handleCardDeleteApproved(card) {
        setCard(card)
        setIsConfirmPopupOpen(true)
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsConfirmPopupOpen(false)
        setSelectedCard({})
        setIsInfoTooltipOpen(false)
    }

    //закрытие попапов по Escape
    useEffect(() => {
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmPopupOpen || selectedCard || isInfoTooltipOpen) {
            function closePopupByEsc(evt) {
                if (evt.code === 'Escape') {
                    closeAllPopups();
                }
            }
            document.addEventListener('keydown', closePopupByEsc);
            return () => {
                document.removeEventListener('keydown', closePopupByEsc);
            }
        }
    }, [])


    function handleCardClick(card) {
        setSelectedCard(card)
    }

    //обновить данные профиля
    function handleUpdateUser(data) {
        api.editProfilePopup(data)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }
    // function handleUpdateUser({name , about}) {
    //     api.editProfilePopup(name , about)
    //         .then((user) => {
    //             setCurrentUser(user)
    //             closeAllPopups()
    //         })
    //         .catch((err) => {
    //             console.log((`${err}`))
    //         })
    // }

    //обновить аватар
    function handleUpdateAvatar(data) {
        api.updateAvatar(data)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }
    // function handleUpdateAvatar({avatar}) {
    //     api.updateAvatar(avatar)
    //         .then((user) => {
    //             setCurrentUser(user)
    //             closeAllPopups()
    //         })
    //         .catch((err) => {
    //             console.log((`${err}`))
    //         })
    // }
    //добавить карточку
    function handleAddPlaceSubmit(evt) {
        api.addNewCard({
            name: evt.place,
            link: evt.link
        })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }

    //зарегистрировать юзера
    function handleRegisterSubmit(email, password) {
        auth.register(email, password)
            .then(() => {
                setIsInfoTooltipOpen(true)
                setIsRegistrationMessage({ status: true, message: 'Вы успешно зарегистрировались!' }); //выдать попап о регистрации
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                console.log((`${err}`))
                setIsInfoTooltipOpen(true)
                setIsRegistrationMessage({ status: false, message: 'Что-то пошло не так! Попробуйте ещё раз.' }) //выдать попап об ошибке
            })
    }

    //залогиниться
    function handleLoginSubmit(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                setLoggedIn(true)
                localStorage.setItem('jwt', data.token) //сохранить токен
                setEmail(email)
                setIsInfoTooltipOpen(true)
                setIsRegistrationMessage({ status: true, message: 'С возвращением!' }); //выдать попап о регистрации
                navigate('/', { replace: true })
                console.log(data.token)
            })
            .catch((err) => {
                console.log((`${err}`))
                setIsInfoTooltipOpen(true)
                setIsRegistrationMessage({ status: false, message: 'Что-то пошло не так! Попробуйте ещё раз.' }) //выдать попап об ошибке
            })
    }

    // проверка jwt 
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        console.log(email)
                        setEmail(email)
                        // setEmail(res.data.email)
                        navigate('/', { replace: true })
                    }
                })
                .catch((err) => {
                    console.log((`${err}`))
                })
        }
    }, []);

    //выход из аккаунта
    function signOut() {
        setLoggedIn(false)
        localStorage.removeItem('token')
        navigate('/sign-in')
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">

                <Routes>
                    <Route path="/sign-up" element={
                        <Register
                            handleRegisterSubmit={handleRegisterSubmit}
                        />} />

                    <Route path="/sign-in" element={
                        <Login
                            handleLoginSubmit={handleLoginSubmit}
                        />} />

                    <Route path="/" element={
                        <ProtectedRoute
                            element={Main}
                            loggedIn={loggedIn}
                            onEditProfile={() => setIsEditProfilePopupOpen(true)}
                            onAddPlace={() => setIsAddPlacePopupOpen(true)}
                            onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                            onCardClick={handleCardClick}
                            onConfirmDelete={handleCardDeleteApproved}
                            cards={cards}
                            onCardLike={handleCardLike}
                            email={email}
                            signOut={signOut}
                        />
                    }
                    />

                    <Route path='*' element={<PageNotFound />} />
                </Routes>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}>
                </EditProfilePopup>

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}>

                </AddPlacePopup>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                >
                </EditAvatarPopup>

                <ConfirmDeletionPopup
                    onClose={closeAllPopups}
                    isOpen={isConfirmPopupOpen}
                    onConfirmDeletion={handleCardDelete}
                >
                </ConfirmDeletionPopup>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    successfullStatus={isRegistrationMessage.status}
                    message={isRegistrationMessage.message}
                />

                <Footer />

            </div>

        </CurrentUserContext.Provider>
    );

}

export default App;