import React, { useState } from 'react';
import useWeatherContext from '../context/weather-context';

const Header = () => {
  const { setCityName } = useWeatherContext();
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className="header">
      <input
        type="text"
        value={searchVal} 
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <button onClick={() => setCityName(searchVal)}>Search</button>
      {/* Add an icon later */}
    </div>
  )
}

export default Header;