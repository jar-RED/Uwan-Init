import React from "react";
import "./Forecast.css";

export const Forecast = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <h2>5-Day Forecast</h2>
      <div className="forecast">
        <div className="forecast-container">
          {data.slice(1, 6).map((day, index) => (
            <div key={index} className="forecast-day">
              <h3>
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h3>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
              />
              <div className="temp-range">
                <span className="max-temp">{Math.round(day.temp.max)}°</span>
                <span className="min-temp">{Math.round(day.temp.min)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
