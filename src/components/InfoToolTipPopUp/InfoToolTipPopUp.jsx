import successIcon from '../../images/success-icon.svg';
import failIcon from '../../images/fail-icon.svg';
import React from 'react';

import './InfoToolTipPopUp.css';

function InfoToolTipPopUp() {
  return (
    <div className="popup">
      <div className="popup__container">
            <img
              src={`${successIcon}`}
              alt="Регистрация прошла успешно"
              className="popup__image"
            />
            <h2 className="popup__title">
              Вы успешно зарегистрировались!
            </h2>
        <button
          className="popup__button-close"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTipPopUp;

{/* <>
            <img
              src={`${failIcon}`}
              alt="Регистрация не была выполнена"
              className="popup__image"
            />
            <h2 className="popup__title">
              Что-то пошло не так. Попробуйте ещё раз!
            </h2>
          </> */}