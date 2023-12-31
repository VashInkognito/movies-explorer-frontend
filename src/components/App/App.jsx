import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import PageNotFound from '../PageNotFound/PageNotFound';
import InfoToolTipPopUp from '../InfoToolTipPopUp/InfoToolTipPopUp';

import Footer from '../Footer/Footer';

import MainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import {
  SUCCES_REGISTRATION_TITLE_OF_POPUP,
  FAIL_REGISTRATION_TITLE_OF_POPUP,
  SUCCES_PROFILE_UPFATE_TITLE_OF_POPUP,
  FAIL_PROFILE_UPFATE_TITLE_OF_POPUP,
} from '../../utils/constants';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  // переменные состояния
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [popupTitle, setPopupTitle] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessSignUp, setIsSuccessSignUp] = React.useState(false);
  const [isSuccessUpdateUserInfo, setIsSuccessUpdateUserInfo] =
    React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  // сохраеннные фильмы
  const [savedMovies, setSavedMovies] = React.useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  //------------------------------------АВТОРИЗАЦИЯ-----------------------------//

  React.useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      MainApi.getCurrentUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      MainApi.getSavedMovies()
        .then((savedMovies) => {
          // if (savedMovies.length > 0) {
          const ownUserMovies = savedMovies.filter(
            (movie) => movie.owner === currentUser._id
          );
          // сохраняем токен c фильмами
          localStorage.setItem('savedMovies', JSON.stringify(ownUserMovies));
          setSavedMovies(ownUserMovies);
          // }
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser._id]);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      const realLocation = pathname;
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(realLocation, { replace: true });
          } else {
            setIsLoggedIn(false);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  function handleRegistration(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res._id) {
          setIsSuccessSignUp(true);
          setPopupTitle(SUCCES_REGISTRATION_TITLE_OF_POPUP);
          setIsOpenPopup(true);
          handleAuthorization(email, password);
        } else {
          setPopupTitle(FAIL_REGISTRATION_TITLE_OF_POPUP);
          setIsSuccessSignUp(false);
          setIsOpenPopup(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAuthorization(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then(({ token }) => {
        if (token) {
          // пользователь залоггинен
          setIsLoggedIn(true);
          // сохраняем токен
          localStorage.setItem('jwt', token);
          MainApi.updateToken();
          navigate('/movies', { replace: true });
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('query');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('shorts');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/', { replace: true });
  }

  //-----------------------------------------------ПРОФИЛЬ--------------------//

  // Функция-отработчик изменения профиля
  function handleUpdateUser(name, email) {
    setIsLoading(true);
    MainApi.changeCurrentUserInfo(name, email)
      .then((newUser) => {
        setIsSuccessUpdateUserInfo(true);
        setPopupTitle(SUCCES_PROFILE_UPFATE_TITLE_OF_POPUP);
        setIsOpenPopup(true);
        setCurrentUser(newUser);
      })
      .catch((err) => {
        setIsSuccessUpdateUserInfo(false);
        setPopupTitle(FAIL_PROFILE_UPFATE_TITLE_OF_POPUP);
        setIsOpenPopup(true);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //-------------------------------------------------ЗАКРЫТИЕ ПОПАПА --------//
  // функция закрытия попапа
  function closePopup() {
    setIsOpenPopup(false);
  }
  // закрытие попапа через esc
  function closePopupWithEsc(e) {
    if (e.key === 'Escape') {
      closePopup();
    }
  }
  // закрытие попапа через оверлей
  function closePopupWithClickOnOverlay(e) {
    if (e.target.classList.contains('popup_opened')) {
      closePopup();
    }
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          {pathname === '/' ||
          pathname === '/movies' ||
          pathname === '/saved-movies' ||
          pathname === '/profile' ? (
            <Header isLoggedIn={isLoggedIn} />
          ) : (
            ''
          )}

          <Routes>
            <Route exact path="/" element={<Main />}></Route>

            <Route
              exact
              path="/movies"
              element={
                isLoggedIn ? (
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              exact
              path="/saved-movies"
              element={
                isLoggedIn ? (
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              exact
              path="/profile"
              element={
                isLoggedIn ? (
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleUpdateUser}
                    onSignOut={handleSignOut}
                    isLoading={isLoading}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              exact
              path="/signup"
              element={
                !isLoggedIn ? (
                  <Register
                    onRegistration={handleRegistration}
                    isLoading={isLoading}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              exact
              path="/signin"
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleAuthorization} isLoading={isLoading} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>

          {pathname === '/' ||
          pathname === '/movies' ||
          pathname === '/saved-movies' ? (
            <Footer />
          ) : (
            ''
          )}

          <InfoToolTipPopUp
            isOpen={isOpenPopup}
            title={popupTitle}
            onClose={closePopup}
            isSuccess={isSuccessSignUp || isSuccessUpdateUserInfo}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
