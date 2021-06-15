import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API = {
  key: process.env.REACT_APP_OPENWEATHER_API_KEY,
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
};

const DEFAULT_CITY_NAME = "Vancouver";
const REFRESH_INTERVAL = 120000; // interval of fetching API

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [cityName, setCityName] = useState(DEFAULT_CITY_NAME);
  const [currentWeather, setCurrentWeather] = useState(null); // current weather
  const [todaysForecast, setTodaysForecast] = useState(null); // today's hourly forecast
  const [futureForecast, setFutureForecast] = useState(null); // hourly 5 days forecast
  const [timeZone, setTimeZone] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchTimer, setFetchTimer] = useState(null);

  useEffect(() => {
    fetchTimer && clearInterval(fetchTimer);
    const fetchAPI = async () => {
      try { 
        const currentWeatherRes = await axios.get(`${API.baseUrl}weather/?q=${cityName}&appid=${API.key}&units=metric`);
        const forecastRes = await axios.get(`${API.baseUrl}forecast/?q=${cityName}&appid=${API.key}&units=metric`);
        console.log(currentWeatherRes.data);  
        // console.log(forecastRes.data); 
        setCurrentWeather(currentWeatherRes.data);
        setTimeZone(forecastRes.data.city.timezone)

        let todaysArray = []; // Array which contains todays forecast information
        let futureArray = []; // Array which contains future forecast information
        let oneDayArray = []; // Array which contains one-day forecast
        
        // Adjust forecast data
        forecastRes.data.list.forEach((data, index) => {
          if (index >= 0 && index <= 7) { // today's forecast
            todaysArray.push(data);
          } else if (index > 7) { // after tomorrow
            if (index % 8 === 0) { // day changed
              oneDayArray = [data]; // initialize array to insert a new array to futureArray
            } else {
              oneDayArray.push(data);
              index % 8 === 7 && futureArray.push(oneDayArray);
            }
          }
        });
        console.log(cityName);
        console.log(todaysArray);
        console.log(futureArray);

        setTodaysForecast(todaysArray);
        setFutureForecast(futureArray);
      } catch(err) {
        console.log(`Error detected. ${err}`);
        if (err.response && err.response.status === 404) { // When the city name didn't match any city names inside API database. 
          // notFound = true;
          // clearInterval(timer); // Stop an iteration to prevent rooping with invalid input value
          alert("The city name you input was not found.");
        }
      }
      setLoading(false); // Close loading page
    }
    const startFetchAPI = async () => {
      await fetchAPI();
      setFetchTimer(setInterval(() => { // set interval
        fetchAPI();
      }, REFRESH_INTERVAL));  
    };
    startFetchAPI();
    return () => clearInterval(fetchTimer);
  }, [cityName]);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        todaysForecast,
        futureForecast,
        setCityName,
        timeZone,
        loading
      }}
    >
      { children }
    </WeatherContext.Provider>
  )
};

const useWeatherContext = () => useContext(WeatherContext);

export { useWeatherContext as default, WeatherProvider };