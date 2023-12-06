# 🎥 Movies-explorer-frontend

Фронтенд часть дипломного проекта «Movies explorer» Яндекс.Практикума по специальности «Веб-разработчик», написанная на React.js.
Одностраничное приложение (Single Page Application), взаимодействующее с [внешним API](https://api.nomoreparties.co/beatfilm-movies) - «Beat Film»
и [бэк-частью](https://github.com/VashInkognito/movies-explorer-api) приложения, реализованную на предыдущем этапе.

## ✏️ Описание

Приложение по поиску и сохранению фильмов.
После успешной регистрации и авторизации на сайте, пользователь воспроизводит поиск фильма по ключевому слову.
Порядок выполения поиска:

- отправка API-запроса на сервер «Beat Film», получение и сохранение данных о фильмах.
- согласно выполненному поиску, отображаются карточки с фильмами на главной странице.
- если пользователь сохраняет понравившийся фильм, карточка отображается на странице с сохраненными пользователем фильмами.
- так же реализована функция фильтрации фильмов по их длительности - отображаются только короткометражные фильмы (длительностью до 40 минут) на странице.
- поиск и фильтрация фильмов по ключевому слову возможны и на странице сохраненных фильмов.

## 🎮 Функциональность

- Адаптивная верстка.
- Регистрация/авторизация пользователей.
- Поиск фильмов по ключевому слову.
- Сохранение/удаление фильмов.
- Пошаговый вывод результатов поиска на экран при клике на копнку «Ещё».
- Редактирование информации о пользователе.
- Валидация форм перед отправкой на сервер.
- Прелоадеры с анимацией во время запросов к серверу.

## 🔧 Технологии

- React
- React Router
- React Hooks (useState, useEffect, useContext, useCallback)
- работа с jwt-токенами
- работа с API
- БЭМ
- контроль версий Git с использованием веток

## ▶ Запуск проекта

- `npm run build` — билд проекта
- `npm run start` — запуск проекта на localhost'е

## ✎ Адрес репозитория

https://github.com/VashInkognito/movies-explorer-frontend

## 📖 Бриф

https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/

Название макета: dark-2
