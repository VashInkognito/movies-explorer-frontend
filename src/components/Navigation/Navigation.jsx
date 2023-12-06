import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [activeBurger, setActiveBurger] = React.useState(false);

  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <nav className="navigation">
      <button
        className="navigation__burger-button"
        onClick={handleActiveBurger}
      >
        <span className="navigation__burger-span"></span>
        <span className="navigation__burger-span"></span>
        <span className="navigation__burger-span"></span>
      </button>
      <div
        className={`navigation__container ${
          activeBurger ? 'navigation__container_visible' : ''
        }`}
      >
        <div className="navigation__menu">
          <div className="navigation__list-container">
            <button
              type="button"
              className="navigation__close-button"
              onClick={handleActiveBurger}
            ></button>
            <ul className="navigation__list">
              <li className="navigation__list-item navigation__list-item_type_main-link">
                <NavLink
                  to="/"
                  className="navigation__link"
                  onClick={handleActiveBurger}
                >
                  Главная
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_movies-link">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    isActive ? 'navigation__link_active' : 'navigation__link'
                  }
                  onClick={handleActiveBurger}
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_saved-movies-link">
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    isActive ? 'navigation__link_active' : 'navigation__link'
                  }
                  onClick={handleActiveBurger}
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
          </div>
          <Link
            to="/profile"
            className="navigation__profile-link"
            onClick={handleActiveBurger}
          >
            Аккаунт
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
