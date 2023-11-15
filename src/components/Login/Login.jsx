import React from 'react';

import SignForm from '../SignForm/SignForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values['email'], values['password']);
  }

  return (
    <SignForm
      title="Рады видеть!"
      name="login"
      buttonText="Войти"
      paragraphLinkText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="sign-form__item">
        <p className="sign-form__item-text">E-mail</p>
        <input
          type="email"
          name="email"
          className={`sign-form__input ${
            errors.email ? 'sign-form__input_type_error' : ''
          }`}
          placeholder="Введите e-mail"
          required
          value={values['email'] || ''}
          onChange={handleChange}
        />
        <span
          className={`sign-form__input-error ${
            errors.email ? 'sign-form__input-error_active' : ''
          }`}
        >
          {errors.email}
        </span>
      </fieldset>

      <fieldset className="sign-form__item">
        <p className="sign-form__item-text">Пароль</p>
        <input
          type="password"
          name="password"
          className={`sign-form__input ${
            errors.password ? 'sign-form__input_type_error' : ''
          }`}
          placeholder="Введите пароль"
          minLength="6"
          required
          value={values['password'] || ''}
          onChange={handleChange}
        />
        <span
          className={`sign-form__input-error ${
            errors.password ? 'sign-form__input-error_active' : ''
          }`}
        >
          {errors.password}
        </span>
      </fieldset>
    </SignForm>
  );
}

export default Login;
