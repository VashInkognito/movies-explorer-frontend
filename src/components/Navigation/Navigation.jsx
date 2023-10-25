import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <button className="navigation__burger-button">
        <span className="navigation__burger-span"></span>
        <span className="navigation__burger-span"></span>
        <span className="navigation__burger-span"></span>
      </button>
      <div className="navigation__container">
        <div className="navigation__menu">
          <div className="navigation__list-container">
            <button className="navigation__close-button"></button>
            <ul className="navigation__list">
              <li className="navigation__list-item navigation__list-item_type_main-link">
                <NavLink to="/" className="navigation__link">
                  Главная
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_movies-link">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    isActive ? 'navigation__link_active' : 'navigation__link'
                  }
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
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to="/profile" className="navigation__link_type_profile-link">
            Аккаунт
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
