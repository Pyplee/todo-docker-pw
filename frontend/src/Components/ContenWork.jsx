import React from 'react';
import Card from '../Components/Card';
import ControlPanel from '../Components/ControlPanel';
import CardCheck from './CardCheck';

function ContentWork() {
  return (
    <>
      <ControlPanel />
      <div className="bg-container-work flex justify-center items-center overflow-y-auto overflow-x-hidden h-full w-full">
          <CardCheck />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
      </div>
    </>
  );
}

export default ContentWork;