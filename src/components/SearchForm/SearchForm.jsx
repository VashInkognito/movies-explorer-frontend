import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({ handleSearchMovie, isLoading }) {
  const { pathname } = useLocation();
  // состояние чекбокса для выбора короткометражек
  const [shorts, setShorts] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState('');

  /*----------------------------------------------------------------------------------------------------------------*/
  function handleChangeInput(e) {
    setInputSearch(e.target.value);
  }

  // выбрать короткометражки
  function handelCheckbox() {
    setShorts(!shorts);
    handleSearchMovie(inputSearch, !shorts);
    if (pathname === '/movies') {
      localStorage.setItem('shorts', !shorts);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (pathname === '/movies') {
      localStorage.setItem('query', inputSearch);
    }
    handleSearchMovie(inputSearch, shorts);
  }
  /*----------------------------------------------------------------------------------------------------------------*/
  // при перезагрузке страницы проверим есть ли запрос уже в localStorage
  // если есть - вставим в поиск и выведем
  React.useEffect(() => {
    if (pathname === '/movies') {
      const savedInputValue = localStorage.getItem('query');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));
      if (savedInputValue) {
        setInputSearch(savedInputValue);
      }
      if (savedShorts) {
        setShorts(savedShorts);
      }
      if (savedInputValue || savedShorts === true) {
        handleSearchMovie(savedInputValue, savedShorts);
      }
    }
  }, []);
  /*----------------------------------------------------------------------------------------------------------------*/
  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input-search"
          className="search__input"
          placeholder="Фильм"
          required
          value={inputSearch}
          onChange={handleChangeInput}
        />
        <button
          type="submit"
          className="search__button"
          disabled={isLoading}
        ></button>
      </form>
      <FilterCheckbox value={shorts} onChange={handelCheckbox} />
    </section>
  );
}

export default SearchForm;
