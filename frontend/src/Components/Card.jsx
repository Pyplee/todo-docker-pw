import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseCardSVG from '../svg_icons/close.svg';
import DeleteCardModal from '../Components/DeleteCardModal';
import Task from '../Components/Task';
import { selectors } from '../slices/tasksSlice.js';
import { useSelector } from 'react-redux';

const Card = ({ card }) => {
  const [delCardShowModal, setDelCardShowModal] = useState(false);

  const handleCloseDel = () => setDelCardShowModal(false);
  const handleShowDel = () => setDelCardShowModal(true);

  const tasks = useSelector(selectors.selectAll).filter((task) => task.cardId === card.id);
  const notComplitedTasks = tasks.filter((task) => !task.isComplited);
  const complitedTasks = tasks.filter((task) => task.isComplited);

  return(
  <>
    <DeleteCardModal show={delCardShowModal} handleClose={handleCloseDel} card={card} />
      <div className="card card-custom" id='auto-height'>
        <div className="card-body card-body-custom">
          <div className='card-title-custom'>
            <h5 className="card-title">{card.title}</h5>
            <button aria-label="Delete card" className="p-2 btn-card-custom" onClick={handleShowDel}>
              <img
                alt='delete task'
                src={CloseCardSVG}
                width="20px"
                height="20px"
                className="w-8 h-8"
                fill="white"
                stroke="currentColor"
                viewBox="0 0 24 24"
                />
            </button>
          </div>
            {notComplitedTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            {complitedTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
          </div>
        </div>
  </>
  );
}

// temp comment for development
// structure of card
// {title: "Home", id: _.uniqueId()}

export default Card;