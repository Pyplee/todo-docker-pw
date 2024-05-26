import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import ControlPanel from '../Components/ControlPanel';
import AddTaskModal from '../Components/AddTaskModal';
import AddCardModal from '../Components/AddCardModal';
import SettingsModal from '../Components/SettingsModal';
import HelpModal from '../Components/HelpModal';
import DeleteComplTasksModal from '../Components/DeleteComplTasksModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../slices/tasksSlice.js';
import { fetchCards } from '../slices/cardsSlice.js';
import { selectors } from '../slices/cardsSlice.js';
import { getSettings } from '../settings.js';
import getStyles from '../bgSettings.js';
import { useTranslation } from 'react-i18next';


function ContentWork() {
  const [addTaskShow, setAddTaskShow] = useState(false);
  const [addCardShow, setAddCardShow] = useState(false);
  const [delTasksShow, setDelTasksShow] = useState(false);
  const [settingsShow, setSettingsShow] = useState(false);
  const [helpShow, setHelpShow] = useState(false);
  const [settingBG, setSettingBG] = useState({ activeEl: 'el1', style: {background: 'linear-gradient(90deg, #aea4e3, #d3ffe8)'} });

  const handleCloseDel = () => setDelTasksShow(false);
  const handleShowDel = () => setDelTasksShow(true);

  const handleCloseTask = () => setAddTaskShow(false);
  const handleShowTask = () => setAddTaskShow(true);

  const handleCloseCard = () => setAddCardShow(false);
  const handleShowCard = () => setAddCardShow(true);

  const handleCloseSett = () => setSettingsShow(false);
  const handleShowSett = () => setSettingsShow(true);

  const handleCloseHelp = () => setHelpShow(false);
  const handleShowHelp = () => setHelpShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchTasks());
  }, [dispatch]);

  const { i18n } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      const settings = await getSettings(i18n);
      const styles = getStyles(settingBG);
      const newLang = settings.lng;
      const lang = i18n.language;
      if (newLang !== lang) {
        i18n.changeLanguage(newLang);
      }
      const activeEl = settings.bgThemeEl;
      setSettingBG({ activeEl, style: styles[activeEl]})
    }
    fetchData();
  }, []);

  const cards = useSelector(selectors.selectAll);

  return (
    <>
    <div id="background" style={settingBG.style}></div>
      <ControlPanel
      handleShowAddTask={handleShowTask}
      handleShowAddCard={handleShowCard}
      handleShowDel={handleShowDel}
      handleShowSett={handleShowSett}
      handleShowHelp={handleShowHelp}
      />
      <AddTaskModal show={addTaskShow} handleClose={handleCloseTask} cards={cards}/>
      <AddCardModal show={addCardShow} handleClose={handleCloseCard} />
      <DeleteComplTasksModal show={delTasksShow} handleClose={handleCloseDel} />
      <SettingsModal show={settingsShow} handleClose={handleCloseSett} setSettingBG={setSettingBG} settingBG={settingBG} />
      <HelpModal show={helpShow} handleClose={handleCloseHelp} />
      <div className="bg-container-work flex justify-center items-center overflow-y-auto overflow-x-hidden h-full w-full">
        {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
      </div>
    </>
  );
}

export default ContentWork;