import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import { BAD_REQUEST_MOVIE, NOT_FOUND_MOVIE } from '../../utils/constants';

import queryFilter from '../../utils/queryFilter';

import './Movies.css';

function Movies({ savedMovies, setSavedMovies }) {
  // все фильмы API/отфмльтрованные после запроса фильмы
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  // ошибка запросов
  const [error, setError] = React.useState('');
  //функция поиска по id
  const getOneIdMovie = (id, array) => {
    const oneIdMovie = array.find((movie) => movie.movieId === id);
    return oneIdMovie._id;
  };

  /*----------------------------------------------------------------------------------------------------------------*/
  // Функция-отработчик фильтрации запроса
  function handleQueryFilter(inputSearch, shorts) {
    // переменная с токеном, содержащий все фильмы
    const storedAllMovies = JSON.parse(localStorage.getItem('allMovies'));
    // переменная с массивом, отфильтрованных фильмов
    const filteredAllMovie = queryFilter(storedAllMovies, inputSearch, shorts);
    if (filteredAllMovie.length === 0) {
      setError(NOT_FOUND_MOVIE);
    }
    // сохранеяем в переменную состояния
    setMovies(filteredAllMovie);
    setIsLoading(false);
  }

  // Функция-отработчик формы найти фильм на странице movie
  function handleSearchMovie(inputSearch, shorts) {
    setIsLoading(true);
    // переменная с токеном, содержащий все фильмы, делаем проверку на его наличие
    const storedAllMovies = JSON.parse(localStorage.getItem('allMovies'));
    if (!storedAllMovies) {
      MoviesApi.getMovies()
        .then((movies) => {
          // создаем токен со всеми фильмами
          localStorage.setItem('allMovies', JSON.stringify(movies));
          // фильтруем запрос
          handleQueryFilter(inputSearch, shorts);
        })
        .catch(() => setError(BAD_REQUEST_MOVIE));
    } else {
      // фильтруем запрос
      handleQueryFilter(inputSearch, shorts);
    }
  }
  /*----------------------------------------------------------------------------------------------------------------*/
  // Функция-отработчик сохранения фильма
  function handleSaveMovie(movie, setIsSaved) {
    MainApi.addMovie(movie)
      .then((newMovie) => {
        // добавляем новый фильм в стейт
        setSavedMovies([...savedMovies, newMovie]);
        // переменная состояния сохраненного/не сохраненного фильма
        setIsSaved(true);
      })
      .catch(() => setError(BAD_REQUEST_MOVIE));
  }

  // Функция-отработчик удаления фильма
  function handleDeleteMovie(movieId, setIsSaved) {
    // находим нужный фильм по его id
    const idSavedMovie = getOneIdMovie(movieId, savedMovies);
    MainApi.deleteMovie(idSavedMovie)
      .then(() => {
        // убираем удаленный фильм из стейта
        setSavedMovies((state) => state.filter((m) => m._id !== idSavedMovie));
        // переменная состояния сохраненного/не сохраненного фильма
        setIsSaved(false);
      })
      .catch(() => setError(NOT_FOUND_MOVIE));
  }
  /*----------------------------------------------------------------------------------------------------------------*/
  React.useEffect(() => {
    const storedSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    // добавила ньюмуви в токен "сохраненные фильмы"
    if (!savedMovies) {
      savedMovies = [];
      storedSavedMovies.push(savedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }
    // удалила ньюмуви из токена "сохраненные фильмы"
    let index = 0;
    for (let i = 0; i < storedSavedMovies.length; i += 1) {
      const film = storedSavedMovies[i];
      if (film._id === savedMovies._id) {
        index = i;
      }
    }
    storedSavedMovies.splice(index, 1);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies)),
    savedMovies,
  ]);
  /*----------------------------------------------------------------------------------------------------------------*/
  return (
    <section className="movies">
      <SearchForm handleSearchMovie={handleSearchMovie} isLoading={isLoading} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          allMovies={movies}
          error={error}
          savedMovies={savedMovies}
          onSave={handleSaveMovie}
          onDelete={handleDeleteMovie}
        />
      )}
    </section>
  );
}

export default Movies;
