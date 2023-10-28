import React from 'react';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      
      <ul className="portfolio__list">

        <li className="portfolio__list-item">
          <a href="https://github.com/VashInkognito/how-to-learn" target="_blank" className="portfolio__link">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        
        <li className="portfolio__list-item">
          <a href="https://github.com/VashInkognito/russian-travel" target="_blank" className="portfolio__link">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/VashInkognito/react-mesto-api-full-gha" target="_blank" className="portfolio__link">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
