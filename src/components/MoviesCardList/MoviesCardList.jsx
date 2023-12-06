import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

import {
  DESKTOP_WIDTH,
  MOBILE_WIDTH,
  LARGE_QUANTITY_OF_MOVIE,
  LARGE_STEP,
  MEDIUM_QUANTITY_OF_MOVIE,
  MEDIUM_STEP,
  SMALL_QUANTITY_OF_MOVIE,
  SMALL_STEP,
} from '../../utils/constants';

function MoviesCardList({ allMovies, savedMovies, onSave, onDelete, error }) {
  const { pathname } = useLocation();
  /*----------------------------------------------------------------------------------------------------------------*/
  // возвращает ширину окна в пикселях
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  // суммарное количество карточек
  const [quantityOfMovie, setQuantityOfMovie] = React.useState(0);
  // колличество прибавленных карточек
  const [oneStepMore, setOneStepMore] = React.useState(0);

  function hadleMoreButton() {
    setQuantityOfMovie(quantityOfMovie + oneStepMore);
  }

  function handleUpdateWindowWidth() {
    setTimeout(() => setWindowWidth(window.innerWidth), 1000);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleUpdateWindowWidth);
    if (pathname === '/saved-movies') {
      setQuantityOfMovie(allMovies.length);
    }
    if (windowWidth >= DESKTOP_WIDTH) {
      setQuantityOfMovie(LARGE_QUANTITY_OF_MOVIE);
      setOneStepMore(LARGE_STEP);
    } else if (windowWidth >= MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
      setQuantityOfMovie(MEDIUM_QUANTITY_OF_MOVIE);
      setOneStepMore(MEDIUM_STEP);
    } else if (windowWidth < MOBILE_WIDTH) {
      setQuantityOfMovie(SMALL_QUANTITY_OF_MOVIE);
      setOneStepMore(SMALL_STEP);
    }
    return () => window.removeEventListener('resize', handleUpdateWindowWidth);
  }, [windowWidth]);

  /*----------------------------------------------------------------------------------------------------------------*/
  const MoreButton = () => (
    <button
      type="button"
      className="movies__button movies__button_type_more"
      onClick={hadleMoreButton}
    >
      Ещё
    </button>
  );
  /*----------------------------------------------------------------------------------------------------------------*/
  return (
    <section className="movies__cards-list">
      {error ? (
        <span className="movies__error">{error}</span>
      ) : (
        <ul className="movies__list">
          {allMovies.map((movie, quantity) => {
            if (quantity < quantityOfMovie) {
              return (
                <MoviesCard
                  key={movie._id || movie.id}
                  onSave={onSave}
                  onDelete={onDelete}
                  savedMovies={savedMovies || allMovies}
                  {...movie}
                />
              );
            }
          })}
        </ul>
      )}
      <div className="movies__btn-container">
        {allMovies.length > quantityOfMovie && pathname !== '/saved-movies' && (
          <MoreButton />
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
