import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ allMovies, savedMovies, onSave, onDelete, error }) {
  const { pathname } = useLocation();
  /*----------------------------------------------------------------------------------------------------------------*/
  // возвращает ширину окна в пикселях
  const width = window.innerWidth;
  // суммарное количество карточек
  const [quantityOfMovie, setQuantityOfMovie] = React.useState(0);
  // колличество прибавленных карточек
  const [oneStepMore, setOneStepMore] = React.useState(0);

  function hadleMoreButton() {
    setQuantityOfMovie(quantityOfMovie + oneStepMore);
  }
  function rulesForRenderMoviesInARow() {
    const width = window.innerWidth;
    if (pathname === '/saved-movies') {
      setQuantityOfMovie(allMovies.length);
    }
    if (width >= 1280) {
      setQuantityOfMovie(12);
      setOneStepMore(3);
    } else if (width >= 768 && width < 1280) {
      setQuantityOfMovie(8);
      setOneStepMore(2);
    } else if (width < 767) {
      setQuantityOfMovie(5);
      setOneStepMore(2);
    }
  }
  // отрисовка карточек в ряд
  React.useEffect(() => {
    rulesForRenderMoviesInARow();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        rulesForRenderMoviesInARow();
      }, 1000);
    });
  }, [width]);
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
