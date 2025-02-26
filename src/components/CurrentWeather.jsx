import React from "react";
import "./CurrentWeather.css";

export const CurrentWeather = ({ data, location }) => {
  return (
    <div className="current-weather">
      <div className="weather-main">
        <h2>{location}</h2>
        <div className="temp-container">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
          <div className="temperature">
            <h1>{Math.round(data.temp)}°C</h1>
          </div>
        </div>
        <p>{data.weather[0].description}</p>
      </div>

      <div className="feels-like">
        <p>Feels like: {Math.round(data.feels_like)}°C</p>
      </div>
    </div>
  );
};
