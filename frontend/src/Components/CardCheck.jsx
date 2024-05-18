import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import CloseCardSVG from '../svg_icons/close.svg';
// import Task from '../Components/Task';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
import { api, routes } from '../routes';

const Card = () => {
  const [showModal, setShowModal] = useState(false);
  const [request, setRequest] = useState('');
  const [status, setStatus] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setRequest('');
    setStatus(null);
  };
  const handleShow = () => setShowModal(true);

  const getRequest = async () => {
    await api.get(routes.tasksPath())
    .then((response) =>  {
      setRequest(response.data.data);
      setStatus(response.status);
    })
    .catch(() => setStatus('Something went wrong'));
  }

  const myStyle = {
    width: '80%',
    height: '70%',
    backgroundColor: 'orange',
    borderRadius: '1rem',
    border: '1px solid gray',
  };
  return(
  <>
      <div className="card card-custom">
        <div className="card-body card-body-custom">
          <div className='card-title-custom'>
            <h5 className="card-title">Section</h5>
            <button aria-label="Delete card" className="p-2 btn-card-custom">
            </button>
          </div>
          <Button variant="primary" onClick={handleShow} style={myStyle}>
            *Big button* CHECK CONNECTION
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request on backend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Status: {status}</h3>
          <br></br>
          <h4>Request path: {routes.tasksPath()}</h4>
          <br></br>
          <h4>Response:</h4>
          <p>{JSON.stringify(request)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={getRequest}>Send request (api/tasks)</Button>
        </Modal.Footer>
      </Modal>
  </>
  );
}

export default Card;