import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import AddTaskSvg from '../svg_icons/add-task.svg';
import AddColumnSvg from '../svg_icons/add-column.svg';
import DeleteSvg from '../svg_icons/delete.svg';
// import HelpSVG from '../svg_icons/help.svg';
import SettingsSVG from '../svg_icons/settings.svg';

function HelpModal({ show, handleClose }) {
  const { t } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('modalHelp.titleModal')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>{t('modalHelp.titleAddTasks')}</h4>
            <p>{t('modalHelp.descAddTasks1')}
              <img
              src={AddTaskSvg}
              className="w-8 h-8 icons-help"
              fill="white"
              stroke="currentColor"
              viewBox="0 0 24 24"
              alt="add task"
              />
              <br />
              {t('modalHelp.descAddTasks2')}</p>
            <div className='container-help-gifs'>
              <img src="gifs/demoAddTask.gif" alt="gifs" />
            </div>
          </div>
          <hr />
          <div>
            <h4>{t('modalHelp.titleViewInfo')}</h4>
            <p>{t('modalHelp.descViewInfo1')}
              <br />
              {t('modalHelp.descViewInfo2')}</p>
            <div className='container-help-gifs'>
              <img src="gifs/demoTaskInfo.gif" alt="gifs" />
            </div>
            <hr />
            <h4>{t('modalHelp.titleCards')}</h4>
            <p>{t('modalHelp.descCards1')}
              <img
              src={AddColumnSvg}
              className="w-8 h-8 icons-help"
              fill="white"
              stroke="currentColor"
              viewBox="0 0 24 24"
              alt="add card"
              />
              <br />
              {t('modalHelp.descCards2')}</p>
            <div className='container-help-gifs'>
              <img src="gifs/demoAddCard.gif" alt="gifs" />
            </div>
          </div>
          <hr />
          <div>
            <h4>{t('modalHelp.titleDelCompTasks')}</h4>
            <p>{t('modalHelp.descDelCompTasks1')}
              <img
              src={DeleteSvg}
              className="w-8 h-8 icons-help"
              fill="white"
              stroke="currentColor"
              viewBox="0 0 24 24"
              alt="delete completed"
              />
              </p>
            <div className='container-help-gifs'>
              <img src="gifs/demoDelTasks.gif" alt="gifs" />
            </div>
          </div>
          <hr />
          <div>
            <h4>{t('modalHelp.titleSettings')}</h4>
            <p>{t('modalHelp.descSettings1')}
              <img
              src={SettingsSVG}
              className="w-8 h-8 icons-help"
              fill="white"
              stroke="currentColor"
              viewBox="0 0 24 24"
              alt="open settings"
              />
              <br />
              {t('modalHelp.descSettings2')}</p>
            <div className='container-help-gifs'>
              <img src="gifs/demoSettings.gif" alt="gifs" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
          {t('buttonsGlobal.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HelpModal;