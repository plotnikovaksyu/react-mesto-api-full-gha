import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register({ handleRegisterSubmit }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(formValue)
        const { email, password } = formValue;
        handleRegisterSubmit(email, password)
    }

    return (
        <>
            <Header>
                <Link to="/sign-in" className="header__entrance">Войти</Link>
            </Header>

            <section className="register">
                <h2 className="register__title">Регистрация</h2>

                <form className="register__form" name="register" onSubmit={handleSubmit}>
                    <fieldset className="register__fieldset">
                        <input className="register__input register__input_login"
                            value={formValue.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            minLength="2"
                            maxLength="50" />
                        <span id="input-login-error" className="register__text-error"></span>
                        <input className="register__input register__input_password"
                            value={formValue.password}
                            onChange={handleChange}
                            type="password"
                            name="password" required
                            placeholder="Пароль"
                            minLength="4"
                            maxLength="50" />
                        <span id="input-password-error" className="register__text-error"></span>
                        <button type="submit"
                            className="register__button submit-button"
                            aria-label="Зарегистрироваться">Зарегистрироваться</button>
                    </fieldset>
                </form>
                <p className="register__log">Уже зарегистрированы?
                    <Link className="register__enter" to="/sign-in" > Войти</Link>
                </p>
            </section>
        </>
    )
}

export default Register;