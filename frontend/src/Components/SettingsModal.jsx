import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CircleTheme from './CircleTheme'
import { useTranslation } from 'react-i18next';
import { setSettings } from '../settings.js';

function SettingsModal({ show, handleClose, setSettingBG, settingBG }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  function handleLanguageChange(newLang) {
    if (newLang !== lang) {
    i18n.changeLanguage(newLang);
    setSettings({ lng: newLang });
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('modalSettings.titleModal')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
            <DropdownButton id="dropdown-basic-button dropdown-custom" title={t('modalSettings.selectLng')} size='lg'>
              <Dropdown.Item href="#" id='en' onClick={() => handleLanguageChange('en')} active={lang === 'en'}>
              <img
                  src="/language_icons/english.png"
                  width="20"
                  height="20"
                  className="d-inline-block align-top custom-lang-icon"
                  alt="en"
                />
                English
              </Dropdown.Item>
              <Dropdown.Item href="#" id='ru' onClick={() => handleLanguageChange('ru')} active={lang === 'ru'}>
              <img
                  src="/language_icons/russia.png"
                  width="20"
                  height="20"
                  className="d-inline-block align-top custom-lang-icon"
                  alt="ru"
                />
                Русский
              </Dropdown.Item>
            </DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('modalSettings.titleBG')}</Form.Label>
              <CircleTheme setSettingBG={setSettingBG} settingBG={settingBG} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
          {t('buttonsGlobal.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SettingsModal;