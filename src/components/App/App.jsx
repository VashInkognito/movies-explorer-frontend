import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';


import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

import PageNotFound from '../PageNotFound/PageNotFound';
import InfoToolTipPopUp from '../InfoToolTipPopUp/InfoToolTipPopUp';

function App() {
  return (
    <div className="page">

        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/movies" element={<Movies/>}></Route>
          <Route path="/saved-movies" element={<SavedMovies/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/signin" element={<Login/>}></Route>
          <Route path="/signup" element={<Register/>}></Route>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>

        <InfoToolTipPopUp/>
      </div>
  );
}

export default App;
