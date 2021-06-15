import React from 'react';
import HourlyInfoItem from './HourlyInfoItem';

const HourlyInfo = ({ hourlyWeather }) => (
  <div className="forecast-list">
    { hourlyWeather && (
        hourlyWeather.map(data => (
          <HourlyInfoItem key={data.hours} {...data} />
        ))
      )
    }
  </div>
);

export default HourlyInfo;