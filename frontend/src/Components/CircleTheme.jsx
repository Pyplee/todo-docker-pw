import React from 'react';
import cn from 'classnames';
import getStyles from '../bgSettings.js';
import { setSettings } from '../settings.js';

function CircleTheme({ settingBG, setSettingBG }) {
  const { activeEl } = settingBG;

  const styles = getStyles(settingBG);

  const handleThemeChange = (e) => {
    const id = e.target.getAttribute('id');
    const newState = { activeEl: id, style: styles[id] }
    setSettingBG(newState);
    setSettings({ bgThemeEl: id });
  }

  return (
    <div className='general-circle-block'>
      <div className='items-block-1'>
        <div id='el1' className={cn('element-1 circle-theme', { 'circle-theme-active': activeEl === 'el1'})} style={styles.el1} onClick={handleThemeChange}></div>
        <div id='el2' className={cn('element-2 circle-theme', { 'circle-theme-active': activeEl === 'el2'})} style={styles.el2} onClick={handleThemeChange}></div>
        <div id='el3' className={cn('element-3 circle-theme', { 'circle-theme-active': activeEl === 'el3'})} style={styles.el3} onClick={handleThemeChange}></div>
      </div>
      <div className='items-block-2'>
        <div id='el4' className={cn('element-4 circle-theme', { 'circle-theme-active': activeEl === 'el4'})} style={styles.el4} onClick={handleThemeChange}></div>
        <div id='el5' className={cn('element-5 circle-theme', { 'circle-theme-active': activeEl === 'el5'})} style={styles.el5} onClick={handleThemeChange}></div>
        <div id='el6' className={cn('element-6 circle-theme', { 'circle-theme-active': activeEl === 'el6'})} style={styles.el6} onClick={handleThemeChange}></div>
      </div>
      <div className='items-block-3'>
        <div id='el7' className={cn('element-7 circle-theme', { 'circle-theme-active': activeEl === 'el7'})} style={styles.el7} onClick={handleThemeChange}></div>
        <div id='el8' className={cn('element-8 circle-theme', { 'circle-theme-active': activeEl === 'el8'})} style={styles.el8} onClick={handleThemeChange}></div>
        <div id='el9' className={cn('element-9 circle-theme', { 'circle-theme-active': activeEl === 'el9'})} style={styles.el9} onClick={handleThemeChange}></div>
      </div>
    </div>
  );
}

export default CircleTheme;