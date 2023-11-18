import { Link, useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  let navigate = useNavigate();
  function handleClick() {
    navigate(-1, { replace: true });
  }

  return (
    <div className="page-not-found">
      <div className="page-not-found__container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__text">Страница не найдена</p>
        <Link onClick={handleClick} className="page-not-found__link">
          Назад
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
