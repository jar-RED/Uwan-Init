import React from "react";
import "./AirConditions.css";

export const AirConditions = ({ data }) => {
  return (
    <div>
      <h2>Air Conditions</h2>
      <div className="air-conditions">
        <div className="conditions-grid">
          <div className="condition">
            <i className="fas fa-wind"></i>
            <div>
              <p>Wind Speed</p>
              <h3>{data.wind_speed} m/s</h3>
            </div>
          </div>

          <div className="condition">
            <i className="fas fa-tint"></i>
            <div>
              <p>Humidity</p>
              <h3>{data.humidity}%</h3>
            </div>
          </div>

          <div className="condition">
            <i className="fas fa-compress-arrows-alt"></i>
            <div>
              <p>Pressure</p>
              <h3>{data.pressure} hPa</h3>
            </div>
          </div>

          <div className="condition">
            <i className="fas fa-eye"></i>
            <div>
              <p>Visibility</p>
              <h3>{data.visibility / 1000} km</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
