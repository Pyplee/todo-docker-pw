import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddCard } from '../slices/cardsSlice.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function AddCardModal({ show, handleClose }) {
  const { t } = useTranslation();
  const [inputTitle, setInputTitle] = useState('');
  const [errosInput, setErroInput] = useState(false);

  const dispatch = useDispatch();

  const changeInputTitle = (e) => {
    if (e.target.value.length === 0) {
      setErroInput(true);
    } else {
      setErroInput(false);
    }
    setInputTitle(e.target.value);
  };

  const handleCreateCard = () => {
    if (inputTitle.length === 0) {
      setErroInput(true);
      return;
    }
    const card = {
      title: inputTitle,
    };
    handleClose();
    dispatch(fetchAddCard(card));
    setInputTitle('');
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('modalAddCard.titleModal')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{t('modalAddCard.titleInput')}</Form.Label>
              <Form.Control
                type="title"
                placeholder={t('modalAddCard.inputHint')}
                autoFocus
                value={inputTitle}
                onChange={changeInputTitle}
                className={errosInput ? 'red-input' : ''}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {t('buttonsGlobal.cancel')}
          </Button>
          <Button variant="primary" onClick={handleCreateCard}>
          {t('buttonsGlobal.create')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCardModal;