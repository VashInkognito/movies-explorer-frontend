import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import { URL_BEATFILM } from '../../utils/constants';

function MoviesCard({ savedMovies, onSave, onDelete, ...props }) {
  const { pathname } = useLocation();
  // переменная состояния сохраненного/не сохраненного фильма
  const [isSaved, setIsSaved] = React.useState(false);
  /*----------------------------------------------------------------------------------------------------------------*/
  // отрисовка кнлопки "сохраненно" на карточках
  React.useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id]);
  /*----------------------------------------------------------------------------------------------------------------*/
  // функция-отработчик сохранения фильма
  function handleSaveMovie() {
    // создаем объект фильма
    const movieData = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: URL_BEATFILM + props.image.url,
      trailerLink: props.trailerLink,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
      thumbnail: URL_BEATFILM + props.image.formats.thumbnail.url,
      movieId: props.id,
    };
    onSave(movieData, setIsSaved);
  }

  // функция-отработчик удаления фильма
  function handleDeleteMovie() {
    onDelete(props._id || props.id, setIsSaved);
  }
  /*----------------------------------------------------------------------------------------------------------------*/
  return (
    <li className="card">
      <img
        src={
          pathname === '/movies'
            ? `${URL_BEATFILM}${props.image.url}`
            : props.image
        }
        alt={props.nameRU}
        className="card__image"
        onClick={(event) => window.open(`${props.trailerLink}`, '_blank')}
      />
      <article className="card__title-block">
        <h2 className="card__title">{props.nameRU}</h2>
        <p className="card__duration">{`${Math.floor(props.duration / 60)}ч ${
          props.duration % 60
        }м`}</p>
      </article>
      {pathname === '/movies' && !isSaved ? (
        <button
          type="button"
          className="card__button card__button_type_card"
          onClick={handleSaveMovie}
        >
          Сохранить
        </button>
      ) : (
        <button
          type="button"
          className={
            !isSaved
              ? 'card__button card__button_type_delete'
              : 'card__button card__button_type_saved'
          }
          onClick={
            pathname === '/saved-movies'
              ? handleDeleteMovie
              : !isSaved
              ? handleSaveMovie
              : handleDeleteMovie
          }
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
