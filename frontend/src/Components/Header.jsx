import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import '../style.css'

function Header() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    setLang(i18n.language); // Обновление языка при изменении через i18n
  }, [i18n.language]);

  function handleLanguageChange(newLang) {
    if (newLang !== lang) {
    i18n.changeLanguage(newLang);
    }
  }

  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-custom-color navbar-padding">
      <Container>
        <Navbar.Brand href="/">{t('navbar.logo')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#">Start</Nav.Link> */}
          </Nav>
          <Nav className="ms-auto">
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title={t('navbar.lang')} id="basic-nav-dropdown">
              
              <NavDropdown.Item href="#" id='en' onClick={() => handleLanguageChange('en')}>
                <img
                  src="/language_icons/english.png"
                  width="20"
                  height="20"
                  className="d-inline-block align-top custom-lang-icon"
                  alt="en"
                />
                English
              </NavDropdown.Item>
              <NavDropdown.Item href="#" id='ru' onClick={() => handleLanguageChange('ru')}>
                <img
                  src="/language_icons/russia.png"
                  width="20"
                  height="20"
                  className="d-inline-block align-top custom-lang-icon"
                  alt="ru"
                />
                Русский
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;