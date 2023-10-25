import React from 'react';

import SignForm from '../SignForm/SignForm';

function Login() {
  return (
    <SignForm
      title="Рады видеть!"
      name="login"
      buttonText="Войти"
      paragraphLinkText="Ещё не зарегистрированы?"
      linkText="Регистрация"
    >

      <label className="sign-form__item">
        <p className="sign-form__item-text">E-mail</p>
        <input
          type="email"
          name="email"
          className="sign-form__input"
          placeholder="E-mail"
          required
          minLength={8}
          maxLength={30}
        />
        <span className="sign-form__input-error">Что-то пошло не так...</span>
      </label>

      <label className="sign-form__item">
        <p className="sign-form__item-text">Пароль</p>
        <input
          type="password"
          name="password"
          className="sign-form__input"
          placeholder="Пароль"
          required
        />
        <span className="sign-form__input-error">Что-то пошло не так...</span>
      </label>
    </SignForm>
  );
}

export default Login;
