import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import MainApi from '../../utils/MainApi';
import queryFilter from '../../utils/queryFilter';
import { BAD_REQUEST_MOVIE, NOT_FOUND_MOVIE } from '../../utils/constants';

import './SavedMovies.css';

function SavedMovies({ savedMovies, setSavedMovies }) {
  // переменная сотояния, для отрисовки сохраненных фильмов
  const [savedMoviesRender, setSavedMoviesRender] = React.useState(savedMovies);
  const [isLoading, setIsLoading] = React.useState(false);
  // ошибка запросов
  const [error, setError] = React.useState('');
  /*----------------------------------------------------------------------------------------------------------------*/
  // отрисовка сохраненных фильмов
  React.useEffect(() => {
    setSavedMoviesRender(savedMovies);
  }, []);
  /*----------------------------------------------------------------------------------------------------------------*/
  // Функция-отработчик формы найти фильм на странице saved-movie
  function handleSearchMovie(inputSearch, shorts) {
    setIsLoading(true);
    // переменная с токеном, содержащий все сохраненные фильмы
    const storedSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    // переменная с массивом, отфильтрованных сохраненных фильмов
    const filteredSavedMovie = queryFilter(
      storedSavedMovies,
      inputSearch,
      shorts
    );
    if (filteredSavedMovie.length === 0) {
      setError(NOT_FOUND_MOVIE);
    }
    // сохранеяем в переменную состояния
    setSavedMoviesRender(filteredSavedMovie);
    setIsLoading(false);
  }
  // Функция-отработчик удаления сохраненного фильма
  function handleDeleteMovie(movieId, setIsSaved) {
    MainApi.deleteMovie(movieId)
      .then(() => {
        // при удалении меняем оба состояния:
        // setSavedMovies - все сохраненные фильмы
        // setSavedMoviesRender - отрисованные сохр фильмы
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
        setSavedMoviesRender((state) => state.filter((m) => m._id !== movieId));
        // переменная состояния сохраненного/не сохраненного фильма
        setIsSaved(false);
        const storedSavedMovies = JSON.parse(
          localStorage.getItem('savedMovies')
        );
        let index = 0;
        for (let i = 0; i < storedSavedMovies.length; i += 1) {
          const film = storedSavedMovies[i];
          if (film._id === savedMovies._id) {
            index = i;
          }
        }
        storedSavedMovies.splice(index, 1);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch(() => setError(BAD_REQUEST_MOVIE));
  }
  /*----------------------------------------------------------------------------------------------------------------*/
  return (
    <section className="movies">
      <SearchForm handleSearchMovie={handleSearchMovie} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          allMovies={savedMoviesRender}
          onDelete={handleDeleteMovie}
          error={error}
        />
      )}
    </section>
  );
}

export default SavedMovies;
