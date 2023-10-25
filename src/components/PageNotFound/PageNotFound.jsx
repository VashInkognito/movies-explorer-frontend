import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="page-not-found__container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__text">Страница не найдена</p>
        <Link to={-1} className="page-not-found__link">Назад</Link>
      </div>
    </div>
  );
};

export default PageNotFound;