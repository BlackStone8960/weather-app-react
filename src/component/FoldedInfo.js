import React from 'react';

const FoldedInfo = ({ tempMax, tempMin, icon, dayOfWeek }) => (
  <div className="oneday-short">
    <span>{dayOfWeek}</span>
    <img src={icon} className="small-weather-icon"></img>
    <div>
      <span>{tempMax}&#8451; / </span><span>{tempMin}&#8451;</span>
    </div>
  </div>
);

export default FoldedInfo;