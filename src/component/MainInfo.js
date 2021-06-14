import React from 'react';

const MainInfo = ({
  weather,
  description,
  feelLike,
  temp,
  tempMax,
  tempMin,
  humidity,
  icon
}) => (
  <div className="oneday-wrapper">
    <h2 className="dayOfWeek">Current weather</h2>
    <div className="current-weather">
      <img src={icon} className="weather-icon"></img>
      <div className="weather-discription">
        <div className="current-weather__description"><em>{weather}</em><span className="weather-detail">{description}</span></div>
        <div className="current-weather__temp">
          <span className="current-temp"><em>{temp}&#8451;</em></span>
          <div>
            <div>H:{tempMax}&#8451; L:{tempMin}&#8451; Feel like: {feelLike}&#8451;</div>
            <div>Humidity: {humidity}%</div>
          </div>
        </div>
      </div>
    </div>
    <div className="forecast-list"></div>
  </div>
);

export default MainInfo;