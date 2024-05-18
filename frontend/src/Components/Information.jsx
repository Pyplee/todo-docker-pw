import React from 'react';
import { useTranslation } from 'react-i18next';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Information = () => {
  const { t } = useTranslation();
  return(
    <>
    <div className="bg-container-information text-white">
      <div className="text-center p-10 container information">
        <h1 className="text-title text-6xl"> <span className='pacific-font'>Todo </span>{t('information.title')}</h1>
        <div className='text-desc-container'>
          <p className="text-lg mt-3 text-desc">{t('information.desc')}</p>
        </div>
        <a href='app' className="text-white font-bold p-3 mt-5 rounded btn-get-start">
          {t('information.btnStart')}
        </a>
      </div>
    </div>
    </>
  );
}

export default Information;