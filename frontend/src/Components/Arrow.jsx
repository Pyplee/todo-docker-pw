import React from "react";

function MainComponent() {
  return (
  <svg width="375" height="75" viewBox="0 0 250 50">
      <path
        d="M5 25 Q 50 5, 100 25 Q 150 45, 200 25 L 240 25 M230 15 L 250 25 L 230 35"
        fill="transparent"
        stroke="#000000"
        strokeWidth="4"
        strokeDasharray="5,5"
      />
    <line
      x1="230"
      y1="15"
      x2="250"
      y2="25"
      stroke="#000000"
      strokeWidth="4"
    />
    <line
      x1="230"
      y1="35"
      x2="250"
      y2="25"
      stroke="#000000"
      strokeWidth="4"
    />
  </svg>
  );
}

function Arrow() {
  return (
    <>
      <MainComponent />
    </>
  );
}

export default Arrow;