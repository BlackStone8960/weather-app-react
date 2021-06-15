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

const Today = () => {
  const { currentWeather, todaysForecast, timeZone } = useWeatherContext();
  const [mainWhether, dispatchMainWeather] = useReducer(mainWeatherReducer, null);
  const [hourlyWeather, dispatchHourlyWeather] = useReducer(hourlyWeatherReducer, null);
  const [folded, setFolded] = useState(true);
  
  useEffect(() => {
    currentWeather && dispatchMainWeather({
      type: 'SET_MAIN_WEATHER',
      weatherData: {
        weather: currentWeather.weather[0].main,
        description : currentWeather.weather[0].description,
        feelLike: Math.round(currentWeather.main.feels_like),
        temp: Math.round(currentWeather.main.temp),
        tempMax: Math.round(currentWeather.main.temp_max),
        tempMin: Math.round(currentWeather.main.temp_min),
        humidity: currentWeather.main.humidity,
        icon: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`   
      }
    })
  }, [currentWeather]);

  useEffect(() => {
    if (todaysForecast) {
      let weatherData = [];

      todaysForecast.forEach((data, index) => {
        if (index % 8 === 0) return;
        const dateTime = moment.unix(data.dt).utc().add(timeZone, 'second');
        weatherData.push({
          hours: dateTime.get('hour'),
          temp: Math.round(data.main.temp),
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        })
      })
      dispatchHourlyWeather({
        type: 'SET_HOURLY_WEATHER',
        weatherData
      })
    }
  }, [todaysForecast, timeZone]);

  const onToggle = () => {
    setFolded(prevState => !prevState);
  }

  return (
    <div className="oneday-container">
      <div className="toggle-arrow" onClick={onToggle}>
        { folded ? <span>↓</span> : <span>↑</span> }
      </div>
      { folded ? (
        <FoldedInfo {...mainWhether} dayOfWeek='Today' />
      ) : (
        <div className="oneday-wrapper">
          <MainInfo {...mainWhether} />
          <HourlyInfo hourlyWeather={hourlyWeather} />  
        </div>
      )}
    </div>
  )
};

export default Today;