import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchRemoveTask } from '../slices/tasksSlice.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

function TaskInfoModal(props) {
  const { title, description } = props.task;
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(fetchRemoveTask(props.task.id));
    props.onHide();
  }

  let modalBody = "";
  if (description !== '') {
    modalBody = (
      <Modal.Body>
      <h4>{description}</h4>
    </Modal.Body>
    );
  }
  return (
    <Modal
      {...props}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {title}
        </Modal.Title>
      </Modal.Header>
      {modalBody}
      <Modal.Footer>
        <Button onClick={props.onHide}>{t('buttonsGlobal.close')}</Button>
        <Button onClick={handleDeleteTask} variant='danger'>{t('buttonsGlobal.delete')}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskInfoModal;