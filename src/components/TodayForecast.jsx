import React from "react";
import "./TodayForecast.css";

export const TodayForecast = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="today-forecast-container">
      <h2>Today's Forecast</h2>
      <div className="today-forecast">
        <div className="hourly-container">
          {data.map((hour, index) => (
            <div key={index} className="hourly-item">
              <p>{new Date(hour.dt * 1000).getHours()}:00</p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={hour.weather[0].description}
              />
              <h3>{Math.round(hour.main.temp)}°</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
