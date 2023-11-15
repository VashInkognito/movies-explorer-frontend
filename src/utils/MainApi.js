class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //-----------------------ПРОФИЛЬ----------------------------------------//

  // Загрузка информации о пользователе с сервера
  getCurrentUserInfo() {
    return this._request('users/me', { headers: this._headers });
  }
  // Редактирование профиля
  changeCurrentUserInfo(name, email) {
    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    });
  }
  //------------------------ФИЛЬМЫ---------------------------------------//
  // Загрузка сохраненных фильмов с сервера
  getSavedMovies() {
    return this._request('movies', { headers: this._headers });
  }
  // Сохранение фильма на сервере
  addMovie(body) {
    return this._request('movies', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    });
  }
  // Удаление фильма с сервера
  deleteMovie(movieId) {
    return this._request(`movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  updateToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }

  //---------------------------УТИЛИТЫ------------------------------------//
  // Универсальный метод запроса с проверкой ответа
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._getResponseData
    );
  }
  // Универсальный метод, который при запросе на сервер возвращает json,
  // если все прошло успешно, или ошибку, если нет
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Создание экземпляра класса Api
const MainApi = new Api({
  baseUrl: 'http://localhost:3000/',
  // baseUrl: 'https://api.vashinkognito.movies.nomoredomainsrocks.ru/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

export default MainApi;
