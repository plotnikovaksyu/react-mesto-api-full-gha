import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function PageNotFound() {
    return (
        <>
        <Header>
            <Link to="/sign-in" className="header__entrance">Войти</Link>
        </Header>

            <div className="not-found">
                <img className="not-found__img" src="https://www.meme-arsenal.com/memes/b0392e0f35825b0f666d34d707c57636.jpg" alt="Страница не найдена"/>
                <h3 className="not-found__title">
                    <span className="not-found__span">404</span> - Страница не найдена
                </h3>
                <Link className="button button_type_to-main" to="/">Вернуться на главную страницу</Link>
            </div>
        </>
    )
}

export default PageNotFound;