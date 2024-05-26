import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { fetchCompleteTask } from '../slices/tasksSlice.js';
import TaskInfoModal from './TaskInfoModal.jsx';

const Task = ({ task }) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  function handleComplite() {
    dispatch(fetchCompleteTask(task));
  }
  const classesCard = cn('card-text', { 'copmpl-block': task.isComplited });
  const classesText = cn('task-text link-task', { 'copmpl-text': task.isComplited });

  return(
  <>
  <TaskInfoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        task={task}
      />
    <div className={classesCard}>
      <div className='task-text-div' onClick={() => setModalShow(true)}>
        <a className={classesText}>{task.title}</a>
      </div>
      <button aria-label="Complite task" className="p-2 btn-comp-task">
        <input type="checkbox" id={task.id} defaultChecked={task.isComplited} className='checkbox-task w-8 h-8' onChange={handleComplite} />
          </button>
    </div>
  </>
  );
}

// temp comment for development
// structure of task
// {title: "Clear files", description: "i need to clear files, tomorrow", id: _.uniqueId(), cardId: 1}

export default Task;