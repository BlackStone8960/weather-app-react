import React from 'react';
import useWeatherContext from '../context/weather-context';
import LoadingPage from './LoadingPage';
import AppRouter from '../router/AppRouter';

const App = () => {
  const { loading } = useWeatherContext();

  return (
    <>
      { loading ? (
        <LoadingPage />
      ) : (
        <AppRouter />
      )}
    </>
  )
};

export default App;