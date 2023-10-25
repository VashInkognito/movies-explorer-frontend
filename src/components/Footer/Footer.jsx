import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__header">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a href="https://practicum.yandex.ru/web/" target="_blank" className="footer__nav-link">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="https://github.com/VashInkognito" target="_blank" className="footer__nav-link">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
