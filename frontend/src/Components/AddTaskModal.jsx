import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddTask } from '../slices/tasksSlice.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

function AddTaskModal({ show, handleClose, cards }) {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState(null);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [errosInput, setErrosInput] = useState({ input: false, selectedCard: false});

  const dispatch = useDispatch();

  const handleCardSelect = (card) => {
    if (card === null) {
      setErrosInput({...errosInput, selectedCard: true });
    } else {
      setErrosInput({...errosInput, selectedCard: false });
    }
    setSelectedCard(card);
  };

  const changeInputTitle = (e) => {
    if (e.target.value.length === 0) {
      setErrosInput({...errosInput, input: true });
    } else {
      setErrosInput({...errosInput, input: false });
    }
    setInputTitle(e.target.value);
  };

  const changeDescTitle = (e) => {
    setInputDesc(e.target.value);
  };

  const handleCreateTask = () => {
    const errors = {
      input: inputTitle.length === 0,
      selectedCard: selectedCard === null,
    };
    if (errors.input || errors.selectedCard) {
      setErrosInput(errors);
      return;
    }
    const task = {
      title: inputTitle,
      description: inputDesc,
      cardId: selectedCard.id,
    };
    handleClose();
    dispatch(fetchAddTask(task));
    setSelectedCard(null);
    setInputTitle('');
    setInputDesc('');
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('modalAddTask.titleModal')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{t('modalAddTask.titleInput')}</Form.Label>
              <Form.Control
                className={errosInput.input ? 'red-input' : ''}
                type="title"
                placeholder={t('modalAddTask.inputHint')}
                autoFocus
                value={inputTitle}
                onChange={changeInputTitle}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{t('modalAddTask.titleDesc')}</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={t('modalAddTask.descHint')}
                rows={3}
                value={inputDesc}
                onChange={changeDescTitle}
                />
            </Form.Group>
            <Form.Group>
            <Form.Label>{t('modalAddTask.titleSelect')}</Form.Label>
              <Dropdown>
              <Dropdown.Toggle variant={errosInput.selectedCard ? 'danger' : 'primary'} id="dropdown-basic">
                {selectedCard ? selectedCard.title : t('modalAddTask.textSelect')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {cards.map((card) => <Dropdown.Item key={card.id} onClick={() => handleCardSelect(card)}>{card.title}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {t('buttonsGlobal.cancel')}
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
          {t('buttonsGlobal.create')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTaskModal;