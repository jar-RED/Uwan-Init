import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";
import { AirConditions } from "./components/AirConditions";
import { TodayForecast } from "./components/TodayForecast";
import {
  fetchWeatherByCoords,
  fetchWeatherByCity,
} from "./services/weatherService";
import "./App.css";
import loader from "./assets/Spin@1x-1.0s-200px-200px.svg";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    // Function to get location and fetch weather
    const fetchLocationWeather = async () => {
      try {
        if (navigator.geolocation) {
          setLoading(true);
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                console.log(`Got coordinates: ${latitude}, ${longitude}`);
                const data = await fetchWeatherByCoords(latitude, longitude);
                setWeather(data.current);
                setForecast(data.forecast);
                setCity(data.location);
                setError(null);
              } catch (err) {
                console.error("Failed to fetch weather:", err);
                setError(`Failed to fetch weather data: ${err.message}`);
              } finally {
                setLoading(false);
              }
            },
            (locationError) => {
              console.error("Geolocation error:", locationError);
              setError(
                "Location access denied. Please search for a city manually."
              );
              setLoading(false);
            },
            { timeout: 10000 }
          );
        } else {
          setError("Geolocation is not supported by your browser");
          setLoading(false);
        }
      } catch (e) {
        console.error("General error in location fetching:", e);
        setError(`Unexpected error: ${e.message}`);
        setLoading(false);
      }
    };

    fetchLocationWeather();
  }, []);

  const handleSearch = async (searchCity) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Searching for city: ${searchCity}`);
      const data = await fetchWeatherByCity(searchCity);
      setWeather(data.current);
      setForecast(data.forecast);
      setCity(data.location);
    } catch (err) {
      console.error("Search error:", err);
      setError(`City not found or API error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header city={city} onSearch={handleSearch} />

      {loading && (
        <div className="loading">
          <div className="spinner">
            <img
              src={loader}
              alt="loader"
              style={{
                width: "50%",
                maxWidth: "200px",
                height: "auto",
                display: "block",
                margin: "auto",
              }}
            />
          </div>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <p className="error-hint">
            Try searching for a city manually or check your API key
            configuration.
          </p>
        </div>
      )}

      {!loading && !error && weather && (
        <>
          <CurrentWeather data={weather} location={city} />

          <div className="weather-details">
            <TodayForecast data={forecast?.hourly} />
            <AirConditions data={weather} />
          </div>

          <Forecast data={forecast?.daily} />
        </>
      )}
    </div>
  );
}

export default App;
