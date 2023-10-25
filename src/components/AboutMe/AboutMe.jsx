import React from 'react';
import photo from '../../images/photo.png';
import './AboutMe.css';

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__header">Студент</h2>
      
      <div className="about-me__container">
        
        <div className="about-me__info">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__name__subtitle">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена &nbsp; и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__link" href="https://github.com/VashInkognito" target="_blank">GitHub</a>
        </div>
        <img src={photo} alt="Фото студента" className="about-me__image" />
      </div>
    </section>
  );
}

export default AboutMe;
