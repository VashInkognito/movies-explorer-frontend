import React from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Profile.css';

function Profile({ isLoggedIn, onEditProfile, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  // переменная-состояния редактирования профиля
  const [isProfileEditingMode, setIsProfileEditingMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // валидация
  const { values, setValues, handleChange, errors, isValid, setIsValid } =
    useFormWithValidation(currentUser);
  /*----------------------------------------------------------------------------------------------------------------*/
  function handleSwitchProfileEditingMode() {
    setIsProfileEditingMode((state) => !state);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      onEditProfile(values['name'], values['email']);
      handleSwitchProfileEditingMode();
    } else {
      setIsValid(false);
      setIsLoading(false);
    }
  }
  /*----------------------------------------------------------------------------------------------------------------*/
  // отображение инпут-значений профиля
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.name, currentUser.email, setValues]);
  /*----------------------------------------------------------------------------------------------------------------*/
  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__inputs">
            <p className="profile__form-text">Имя</p>
            <input
              type="text"
              name="name"
              className={`profile__input ${
                errors.name ? 'profile__input_type_error' : ''
              }`}
              required
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              value={values['name'] || ''}
              onChange={handleChange}
              {...(!isProfileEditingMode || isLoading
                ? { disabled: true }
                : {})}
            />
          </fieldset>
          <span
            className={`profile__input-error ${
              errors.name ? 'profile__input-error_active' : ''
            }`}
          >
            {errors.name}
          </span>

          <div className="profile__border"></div>

          <fieldset className="profile__inputs">
            <p className="profile__form-text">E-mail</p>
            <input
              type="email"
              name="email"
              className={`profile__input ${
                errors.email ? 'profile__input_type_error' : ''
              }`}
              required
              placeholder="E-mail"
              value={values['email'] || ''}
              onChange={handleChange}
              {...(!isProfileEditingMode || isLoading
                ? { disabled: true }
                : {})}
            />
          </fieldset>
          <span
            className={`profile__input-error ${
              errors.email ? 'profile__input-error_active' : ''
            }`}
          >
            {errors.email}
          </span>

          {isProfileEditingMode ? (
            <>
              <button
                className={`profile__button profile__button_type_save ${
                  !isValid || isLoading ? 'profile__button_type_disabled' : ''
                }`}
                type="submit"
              >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </>
          ) : (
            <>
              <button
                className="profile__button profile__button_type_edit-profile"
                onClick={handleSwitchProfileEditingMode}
              >
                Редактировать
              </button>
              <button
                className="profile__button profile__button_type_logout"
                onClick={onSignOut}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default Profile;
