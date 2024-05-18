import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseCardSVG from '../svg_icons/close.svg';
import Task from '../Components/Task';

const Card = () => {
  return(
  <>
      <div className="card card-custom">
        <div className="card-body card-body-custom">
          <div className='card-title-custom'>
            <h5 className="card-title">Section</h5>
            <button aria-label="Delete card" className="p-2 btn-card-custom">
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
            <Task />
          </div>
        </div>
  </>
  );
}

// temp comment for development
// structure of card
// {title: "Home", id: _.uniqueId()}

export default Card;