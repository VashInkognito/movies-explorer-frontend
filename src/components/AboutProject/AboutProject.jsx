import React from 'react';

import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__header">О проекте</h2>
      <div className="two-columns">
        <div className="two-columns__item">
          <h3 className="two-columns__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="two-columns__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        <div className="two-columns__item">
          <h3 className="two-columns__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="two-columns__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline__item">
          <h4 className="timeline__title timeline__title_type_color">1 неделя</h4>
          <p className="timeline__text">Back-end</p>
        </div>

        <div className="timeline__item">
          <h4 className="timeline__title">4 недели</h4>
          <p className="timeline__text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
