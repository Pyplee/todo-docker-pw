import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchRemoveCompTasks } from '../slices/tasksSlice.js';
import { selectors } from '../slices/tasksSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function DeleteComplTasksModal ({ show, handleClose }) {
  const tasks = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteComplTasks = () => {
    const complitedTasks = tasks.filter((task) => task.isComplited);
    const ids = complitedTasks.map((task) => task.id)
    dispatch(fetchRemoveCompTasks(ids));
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{t('modalDelCompTasks.titleModal')}</Modal.Title>
    </Modal.Header>
    <Modal.Body><h4>{t('modalDelCompTasks.textModal')}</h4></Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
      {t('buttonsGlobal.cancel')}
      </Button>
      <Button variant="danger" onClick={handleDeleteComplTasks}>
      {t('buttonsGlobal.delete')}
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default DeleteComplTasksModal;