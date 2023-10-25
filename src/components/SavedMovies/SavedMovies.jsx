import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

const MoreButton = () => (
  <button type="button" className="movies__button movies__button_type_hidden">
        Ещё
      </button>
)

function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header />
      <SearchForm/>
      <MoviesCardList/>
      <div className="movies__button-container">
      <MoreButton/>
      </div>
      <Footer />
    </section>
  );
}

export default SavedMovies;
