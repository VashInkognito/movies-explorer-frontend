import React from 'react';
import { Link } from 'react-router-dom';

import headerLogo from '../../images/logo.svg';
import './SignForm.css';

function SignForm({ title, name, buttonText, paragraphLinkText, linkText, children }) {
  return (
    <section className="sign-form">
        <Link to="/" className="sign-form__img-link">
          <img className="sign-form__logo" src={headerLogo} alt="Логотип"></img>
        </Link>
        <h2 className="sign-form__title">{title}</h2>
        <form className="sign-form__form-items">
          {children}
          <button className={`sign-form__button-submit sign-form__button-submit_type_${name}`} type="submit">
            {buttonText}
          </button>
        </form>
        <p className="sign-form__paragraph-link">
          {paragraphLinkText}
          <Link className="sign-form__link" to="/signin">
            {linkText}
          </Link>
        </p>
    </section>
  );
}

export default SignForm;
