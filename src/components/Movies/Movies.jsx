import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

const MoreButton = () => (
  <button type="button" className="movies__button">
        Ещё
      </button>
)

function Movies() {
  return (
    <section className="movies">
      <Header />
      <SearchForm/>

      <Preloader />
      
      <MoviesCardList/>
      <div className="movies__button-container">
      <MoreButton/>
      </div>
      <Footer />
    </section>
  );
}

export default Movies;
