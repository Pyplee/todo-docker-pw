import React from 'react';
import { useTranslation } from 'react-i18next';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Arrow from './Arrow';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className='bg-container-about'>
    <div className="p-10 container about">
      <div className='read-more'>
        <h2 className='title-about'>
        {t('about.title')}
        </h2>
        <p className='text-black text-desc'>
          {t('about.desc')}
        </p>
      </div>
      <div className='arrow'>
        <Arrow />
      </div>
      <div className='links'>
        <a href='https://github.com/Pyplee' target="_blank" rel="noreferrer" className='text-black link-info'>{t('about.linkProfile')}</a>
        <a href='#' className='text-black link-info'>{t('about.linkFrontend')}</a>
        <a href='#' className='text-black link-info'>{t('about.linkBackend')}</a>
        <a href='#' className='text-black link-info'>{t('about.linkDocker')}</a>
      </div>
    </div>
  </div>
  );
}

export default About;
