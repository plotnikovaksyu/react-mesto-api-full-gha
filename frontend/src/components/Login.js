import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Login({ handleLoginSubmit }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = formValue;
        handleLoginSubmit(email, password)
    }

    return (
        <>
            <Header>
                <Link to="/sign-up" className="header__entrance">Регистрация</Link>
            </Header>

            <section className="register login">
                <h2 className="register__title">Вход</h2>

                <form className="register__form" name="register" onSubmit={handleSubmit}>
                    <fieldset className="register__fieldset">
                        <input className="register__input"
                            value={formValue.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            minLength="2"
                            maxLength="50" />
                        <span id="input-login-error" className="register__text-error"></span>
                        <input className="register__input"
                            type="password"
                            name="password"
                            required
                            placeholder="Пароль"
                            minLength="4"
                            maxLength="50"
                            onChange={handleChange}
                            value={formValue.password} />
                        <span id="input-password-error" className="register__text-error"></span>
                        <button type="submit"
                            className="register__button login__button submit-button"
                            aria-label="Зарегистрироваться">Войти</button>
                    </fieldset>
                </form>
            </section>
        </>
    )
}

export default Login;