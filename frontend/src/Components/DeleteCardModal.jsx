import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchRemoveCard } from '../slices/cardsSlice.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

function DeleteCardModal ({ show, handleClose, card }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteCard = () => {
    dispatch(fetchRemoveCard(card.id));
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{t('modalDelCard.titleModal')}</Modal.Title>
    </Modal.Header>
    <Modal.Body><h4>{t('modalDelCard.textModal')} &quot;{card.title}&quot; ?</h4></Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
      {t('buttonsGlobal.cancel')}
      </Button>
      <Button variant="danger" onClick={handleDeleteCard}>
      {t('buttonsGlobal.delete')}
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default DeleteCardModal;