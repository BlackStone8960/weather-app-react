import React from 'react';

const HourlyInfoItem = ({ hours, icon, temp }) => (
  <div className="forecast-hour">
    <div>{hours}:00</div>
    <img src={icon}></img>
    <div>{temp}&#8451;</div>
  </div>
);

export default HourlyInfoItem;