import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App(){

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const API_KEY = "54c9e809c1d303d692d887614f00a6fe";

  const fetchWeather = async () => {

    try{

      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setError('');
    }
    catch (err){
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      fetchWeather();
    }
  }

  return (
    <div className='App'>

      <h1>Weather App</h1>

      <div className='input-container'>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Enter city'
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}
      {weather && (
        <div className='weather-info'>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;