import React, { useEffect, useReducer, useState } from 'react';
import moment from 'moment';
import useWeatherContext from '../../context/weather-context';
import MainInfo from './info/MainInfo';
import HourlyInfo from './info/HourlyInfo';
import FoldedInfo from './info/FoldedInfo';

const mainWeatherReducer = (state, action) => {
  switch(action.type) {
    case 'SET_MAIN_WEATHER' :
      return action.weatherData
    default :
      return state
  }
};
const hourlyWeatherReducer = (state, action) => {
  switch(action.type) {
    case 'SET_HOURLY_WEATHER' :
      return action.weatherData
    default :
      return state
  }
};

const DAY_ARRAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Future = ({ oneDayData }) => {
  const { timeZone } = useWeatherContext();
  const [mainWhether, dispatchMainWeather] = useReducer(mainWeatherReducer, null);
  const [hourlyWeather, dispatchHourlyWeather] = useReducer(hourlyWeatherReducer, null);
  const [folded, setFolded] = useState(true);

  useEffect(() => {
    if (oneDayData) {
      let weatherData = [];

      oneDayData.forEach((data, index) => {
        const dateTime = moment.unix(data.dt).utc().add(timeZone, 'second');
        if (index % 8 === 0) {
          dispatchMainWeather({
            type: 'SET_MAIN_WEATHER',
            weatherData: {
              dayOfWeek: DAY_ARRAY[dateTime.get('day')],
              weather: data.weather[0].main,
              description: data.weather[0].description,
              feelLike: Math.round(data.main.feels_like),
              temp: Math.round(data.main.temp),
              tempMax: Math.round(data.main.temp_max),
              tempMin: Math.round(data.main.temp_min),
              humidity: data.main.humidity,  
              icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }
          })        
        } else {
          weatherData.push({
            hours: dateTime.get('hour'),
            temp: Math.round(data.main.temp),
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          })
        }
      })
      dispatchHourlyWeather({
        type: 'SET_HOURLY_WEATHER',
        weatherData
      })
    }
  }, [oneDayData, timeZone]);

  const onToggle = () => {
    setFolded(prevState => !prevState);
  }

  return (
    <div className="oneday-container">
      <div className="toggle-arrow" onClick={onToggle}>
        { folded ? <span>↓</span> : <span>↑</span> }
      </div>
      { folded ? (
        <FoldedInfo {...mainWhether} />
      ) : (
        <div className="oneday-wrapper">
          <MainInfo {...mainWhether} />
          <HourlyInfo hourlyWeather={hourlyWeather} />  
        </div>
      )}
    </div>
  )
};

export default Future;