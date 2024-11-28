import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const defaultWeatherData = {
    name: "London",
    main: { temp: 15, humidity: 72 },
    weather: [{ main: "Clouds" }],
    wind: { speed: 3.6 }, // m/s
  };

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [error, setError] = useState(false);

  const search = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(false);
    } catch (err) {
      setError(true);
      setWeatherData(defaultWeatherData); // Revert to default data
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return clear_icon;
      case 'Clouds':
        return cloud_icon;
      case 'Drizzle':
        return drizzle_icon;
      case 'Rain':
        return rain_icon;
      case 'Snow':
        return snow_icon;
      default:
        return clear_icon; // Default to clear icon if no match
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={city}
          onChange={handleInputChange}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>

      <div className="weather-image">
        <img
          src={getWeatherIcon(weatherData.weather[0].main)}
          alt="Weather icon"
        />
      </div>
      <div className="weather-temp">{Math.round(weatherData.main.temp)}°C</div>
      <div className="weather-location">
        {error ? "City not found" : weatherData.name}
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              {weatherData.main.humidity}%
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="Wind icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              {Math.round(weatherData.wind.speed * 3.6)} km/h
            </div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
