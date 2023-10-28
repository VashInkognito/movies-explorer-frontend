import React from 'react';

import Header from '../Header/Header';

import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <Header />
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <label className="profile__inputs">
            <span className="profile__form-text">Имя</span>
            <input
              type="text"
              name="name"
              className="profile__input"
              required
              placeholder="Виталий"
              minLength={8}
              maxLength={30}
            />
          </label>
          <span className="profile__input-error">Что-то пошло не так...</span>
          <div className="profile__border"></div>
          <label className="profile__inputs profile__inputs_border">
            <span className="profile__form-text">E-mail</span>
            <input
              type="email"
              name="email"
              className="profile__input"
              required
              placeholder="pochta@yandex.ru"
              minLength={8}
              maxLength={30}
            />
          </label>
          <span className="profile__input-error">Что-то пошло не так...</span>
          <div>
          <button
            className="profile__button profile__button_type_edit-profile"
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_type_logout"
            type="submit"
          >
            Выйти из аккаунта
          </button>
          </div>
          {/* <div>
            <span className="profile__button-error">
              При обновлении профиля произошла ошибка.
            </span>
            <button
              className="profile__button profile__button_type_save"
              type="submit"
            >
              Сохранить
            </button>
          </div> */}
        </form>
      </div>
    </section>
  );
}

export default Profile;
