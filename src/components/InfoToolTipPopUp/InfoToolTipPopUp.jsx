import React from 'react';
import successIcon from '../../images/success-icon.svg';
import failIcon from '../../images/fail-icon.svg';

import './InfoToolTipPopUp.css';

function InfoToolTipPopUp({
  isOpen,
  title,
  isSuccess,
  onClose,
  onCloseEsc,
  onCloseOverlay,
}) {
  // слушатель закрытия попапов через esc
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onCloseEsc);
    }
    return () => document.removeEventListener('keydown', onCloseEsc);
  }, [isOpen]);
  // слушатель закрытия попапов через overlay
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', onCloseOverlay);
    }
    return () => document.removeEventListener('mousedown', onCloseOverlay);
  }, [isOpen]);
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        {isSuccess ? (
          <>
            <img
              src={`${successIcon}`}
              alt="Регистрация прошла успешно"
              className="popup__image"
            />
            <h2 className="popup__title">{title}</h2>
          </>
        ) : (
          <>
            <img
              src={`${failIcon}`}
              alt="Регистрация не была выполнена"
              className="popup__image"
            />
            <h2 className="popup__title">{title}</h2>
          </>
        )}
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTipPopUp;
