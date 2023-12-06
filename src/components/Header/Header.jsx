import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import headerLogo from '../../images/logo.svg';
import './Header.css';

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
      </Link>
      {isLoggedIn ? (
        <Navigation />
      ) : (
        <nav className="header__nav">
          <ul className="header__list">
            <li>
              <Link to="/signup" className="header__nav-link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="header__nav-link header__nav-link_type_login"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
export default Header;
