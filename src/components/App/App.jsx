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
      // Забираем с сервера инф о пользователе и фильмы
      Promise.all([MainApi.getCurrentUserInfo(), MainApi.getSavedMovies()])
        .then(([user, savedMovies]) => {
          setCurrentUser(user);
          const ownUserMovies = savedMovies.filter(
            (movie) => movie.owner === currentUser._id
          );
          // сохраняем токен c фильмами
          localStorage.setItem('savedMovies', JSON.stringify(ownUserMovies));
          setSavedMovies(ownUserMovies);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn, currentUser._id]);

  function handleRegistration(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res._id) {
          setIsSuccessSignUp(true);
          setPopupTitle('Вы успешно зарегистрировались!');
          setIsOpenPopup(true);
          handleAuthorization(email, password);
        } else {
          setPopupTitle('Что-то пошло не так. Попробуйте ещё раз!');
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
    setCurrentUser({
      name: ' ',
      email: ' ',
    });
    navigate('/', { replace: true });
  }

  //-----------------------------------------------ПРОФИЛЬ--------------------//

  // Функция-отработчик изменения профиля
  function handleUpdateUser(name, email) {
    setIsLoading(true);
    MainApi.changeCurrentUserInfo(name, email)
      .then((newUser) => {
        setIsSuccessUpdateUserInfo(true);
        setPopupTitle('Данные успешно обновлены!');
        setIsOpenPopup(true);
        setCurrentUser(newUser);
      })
      .catch((err) => {
        setIsSuccessUpdateUserInfo(false);
        setPopupTitle('При обновлении профиля произошла ошибка!');
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
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />

          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            }
          />

          <Route
            exact
            path="/signup"
            element={<Register onRegistration={handleRegistration} />}
          />

          <Route
            exact
            path="/signin"
            element={<Login onLogin={handleAuthorization} />}
          />

          <Route
            exact
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
