import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import clear_icon from '../Assets/clear.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);




  const fetchData = async () => {
    if (city) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=efcb15b69c1949f431a088734ee973df`
        );
        setWeatherData(response.data);
        console.log(response.data); // You can see all the weather data in console log
        setSearchPerformed(true);
      
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const search = () => {
    if (city) {
      fetchData();
    }
  };


  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clouds':
        return cloud_icon;
      case 'Drizzle':
        return drizzle_icon;
      case 'Clear':
        return clear_icon;
      case 'Rain':
        return rain_icon;
      case 'Snow':
        return snow_icon;
      default:
        return cloud_icon; // Default icon
    }
  };

  return (
    <div className="container1">
    <div className='container'>
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
      {!searchPerformed ? (
        <>
         <div className="weather-image">
         <img src={clear_icon} alt="Weather Icon"  />
       </div>
       <div className="weather-temp">°C</div>
       <div className="weather-location"></div>

       <p className="desc"></p>

       <div className="data-container">
         <div className="element">
           <img src={humidity_icon} alt="Humidity Icon" className="icon" />
           <div className="data">
             <div className="humidity-percent">%</div>
             <div className="text">Humidity</div>
           </div>
         </div>
         <div className="element">
           <img src={wind_icon} alt="Wind Icon" className="icon" />
           <div className="data">
             <div className="humidity-percent"> m/s</div>
             <div className="text">Wind Speed</div>
           </div>
         </div>
       </div></>
      
      ) : (

      weatherData && (
        <>
          <div className="weather-image">
            <img src={getWeatherIcon(weatherData.weather[0].main)} alt="Weather Icon"  />
          </div>
          <div className="weather-temp">{weatherData.main.temp}°C</div>
          <div className="weather-location">{weatherData.name}</div>

          <p className="desc">{weatherData.weather[0].description}</p>

          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="Humidity Icon" className="icon" />
              <div className="data">
                <div className="humidity-percent">{weatherData.main.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="Wind Icon" className="icon" />
              <div className="data">
                <div className="humidity-percent">{weatherData.wind.speed} m/s</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )
    )}
      
    </div>
    </div>
  );
};

export default WeatherApp;
