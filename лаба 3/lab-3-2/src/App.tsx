import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './init';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(0);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-4 border rounded shadow bg-light">
        <div className="btn-group mb-3" role="group">
          <button
            type="button"
            className={`btn btn-${i18n.language === 'en' ? 'primary' : 'outline-primary'}`}
            onClick={() => changeLanguage('en')}
          >
            {t('language.english')}
          </button>
          <button
            type="button"
            className={`btn btn-${i18n.language === 'ru' ? 'primary' : 'outline-primary'}`}
            onClick={() => changeLanguage('ru')}
          >
            {t('language.russian')}
          </button>
        </div>

        <div>
          <button className="btn btn-info mb-3 w-100" onClick={() => setCount(count + 1)}>
            {t('clicks', { count })}
          </button>
        </div>

        <div>
          <button className="btn btn-warning w-100" onClick={() => setCount(0)}>
            {t('reset')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
