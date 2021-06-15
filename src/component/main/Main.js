import React from 'react';
import useWeatherContext from '../../context/weather-context';
import Today from './Today';
import Future from './Future';
import CityName from './CityName';

const Main = () => {
  const { futureForecast } = useWeatherContext();

  return (
    <>
      <CityName />
      <Today />
      {
        futureForecast && futureForecast.map((oneDayData) => (
          <Future key={oneDayData[0].dt} oneDayData={oneDayData} />
        ))
      }
    </>
  )
};

export default Main;