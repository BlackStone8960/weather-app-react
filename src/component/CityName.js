import React from 'react';
import useWeatherContext from '../context/weather-context';

const CityName = () => {
  const { currentWeather } = useWeatherContext();

  return (
    <>
      { currentWeather && 
        <h1 id="place">{`${currentWeather.name}, ${currentWeather.sys.country}`}</h1>
      }
    </>
  );
};

export default CityName;