import React, { useState, useEffect, useRef } from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTaskSvg from '../svg_icons/add-task.svg';
import AddColumnSvg from '../svg_icons/add-column.svg';
import DeleteSvg from '../svg_icons/delete.svg';
import HelpSVG from '../svg_icons/help.svg';
import SettingsSVG from '../svg_icons/settings.svg';

function ControlPanel({ handleShowAddTask, handleShowAddCard, handleShowDel, handleShowSett, handleShowHelp }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  // const { t, i18n } = useTranslation();

useEffect(() => {
  if (headerRef.current) {
    setHeaderHeight(headerRef.current.offsetHeight); // Получаем высоту header
  }
}, []);

  return (
    <div className="control-panel position-absolute top-25 start-0 d-flex flex-column align-items-center gap-3 p-4 bg-white rounded-end shadow-lg"
    style={{ top: `${headerHeight}px`, position: 'absolute', left: '0', zIndex: '10' }}
    >
      <button aria-label="Add task" className="p-2 btn-panel-custom" onClick={handleShowAddTask}>
        <img
          alt='add task'
          src={AddTaskSvg}
          className="w-8 h-8"
          fill="white"
          stroke="currentColor"
          viewBox="0 0 24 24"
        />
      </button>
      <button aria-label="Add card" className="p-2 btn-panel-custom" onClick={handleShowAddCard}>
        <img
            alt='add column'
            src={AddColumnSvg}
            className="w-8 h-8"
            fill="white"
            stroke="currentColor"
            viewBox="0 0 24 24"
          />
      </button>
      <button aria-label="Delete" className="p-2 btn-panel-custom" onClick={handleShowDel}>
        <img
          alt='delete task'
          src={DeleteSvg}
          className="w-8 h-8"
          fill="white"
          stroke="currentColor"
          viewBox="0 0 24 24"
          />
      </button>
      <div className='down-button'>
        <button aria-label="Settings" className="p-2 btn-panel-custom" onClick={handleShowSett}>
          <img
            alt='settings'
            src={SettingsSVG}
            className="w-8 h-8"
            fill="white"
            stroke="currentColor"
            viewBox="0 0 24 24"
            />
        </button>
        <button aria-label="Help" className="p-2 btn-panel-custom" onClick={handleShowHelp}>
          <img
              alt='help'
              src={HelpSVG}
              className="w-8 h-8"
              fill="white"
              stroke="currentColor"
              viewBox="0 0 24 24"
              />
        </button>
      </div>
</div>
  );
}

export default ControlPanel;