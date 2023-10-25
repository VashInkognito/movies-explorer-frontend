import React from 'react';

import SignForm from '../SignForm/SignForm';

function Register() {
  return (
    <SignForm
      title="Добро пожаловать!"
      name="register"
      buttonText="Зарегистрироваться"
      paragraphLinkText="Уже зарегистрированы?"
      linkText="Войти"
    >
      <label className="sign-form__item">
        <p className="sign-form__item-text">Имя</p>
        <input
          type="text"
          name="name"
          className="sign-form__input"
          placeholder="Имя"
          required
          minLength={8}
          maxLength={30}
        />
        <span className="sign-form__input-error">Что-то пошло не так...</span>
      </label>

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

export default Register;
