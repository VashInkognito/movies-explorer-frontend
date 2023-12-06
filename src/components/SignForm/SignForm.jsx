import React from 'react';
import { Link } from 'react-router-dom';

import headerLogo from '../../images/logo.svg';
import './SignForm.css';

function SignForm({
  title,
  name,
  buttonText,
  paragraphLinkText,
  linkText,
  onSubmit,
  isValid,
  isLoading,
  children,
}) {
  return (
    <section className="sign-form">
      <Link to="/" className="sign-form__img-link">
        <img className="sign-form__logo" src={headerLogo} alt="Логотип"></img>
      </Link>
      <h2 className="sign-form__title">{title}</h2>
      <form className="sign-form__form-items" onSubmit={onSubmit}>
        {children}

        <button
          className={`sign-form__button-submit sign-form__button-submit_type_${name} ${
            !isValid && isLoading ? 'sign-form__button-submit_disabled' : ''
          }`}
          type="submit"
          disabled={!isValid && isLoading}
        >
          {buttonText}
        </button>
      </form>
      <p className="sign-form__paragraph-link">
        {paragraphLinkText}
        {name === 'register' && (
          <Link to="/signin" className="sign-form__link">
            {linkText}
          </Link>
        )}
        {name === 'login' && (
          <Link to="/signup" className="sign-form__link">
            {linkText}
          </Link>
        )}
      </p>
    </section>
  );
}

export default SignForm;
