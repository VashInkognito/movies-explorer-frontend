import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="search__button"></button>
      </form>
      <FilterCheckbox/>
    </section>
  );
}

export default SearchForm;
