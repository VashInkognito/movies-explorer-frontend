import React from 'react';
import './MoviesCard.css';
import cardImage from '../../images/card-image.jpg';

function MoviesCard() {
  return (
    <li className="card">
      
      <img src={cardImage} alt="Постер фильма" className="card__image" />
      <article className="card__title-block">
        <h2 className="card__title">33 слова о дизайне</h2>
        <p className="card__duration">1ч 17м</p>
      </article>
      <button type="button" className="card__button card__button_type_not-saved">Сохранить</button>
      {/* <button type="button" className="card__button card__button_type_saved"></button>
      <button type="button" className="card__button card__button_type_delete"></button> */}
    </li>
  );
}

export default MoviesCard;