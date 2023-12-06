class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // Загрузка фильмов с сервера
  getMovies() {
    return fetch(this._baseUrl, { headers: this._headers }).then(
      this._getResponseData
    );
  }
  //---------------------------УТИЛИТЫ------------------------------------//
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
const MoviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default MoviesApi;
