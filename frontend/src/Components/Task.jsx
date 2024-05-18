import React from 'react';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTasks, selectors as tasksSelectors } from '../slices/tasksSlice.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import CompliteTaskSVG from '../svg_icons/mark-complite.svg';
// import ComeBackSVG from '../svg_icons/come-back.svg';

const Task = () => {
  function click(e) {
    console.log("yes");
  }

  // const dispatch = useDispatch();
  //   useEffect(() => {
  //       dispatch(fetchTasks());
  //   }, []);
  //   const tasks = useSelector(tasksSelectors.selectAll);

  return(
  <>
    <div className="card-text">
      <div className='task-text-div'>
        <a className='task-text link-task' onClick={click}>Task example asdsdad asdasdasd(new)</a>
      </div>
      <button aria-label="Complite task" className="p-2 btn-comp-task">
        <input type="checkbox" id="temp" name="temp" value="temp" className='checkbox-task w-8 h-8' />
              {/* <img
                alt='complite task'
                src={CompliteTaskSVG}
                width="30px"
                height="30px"
                className="w-8 h-8"
                fill="white"
                stroke="currentColor"
                viewBox="0 0 24 24"
                /> */}
            </button>
    </div>
  </>
  );
}

// temp comment for development
// structure of task
// {title: "Clear files", description: "i need to clear files, tomorrow", id: _.uniqueId(), cardId: 1}

export default Task;