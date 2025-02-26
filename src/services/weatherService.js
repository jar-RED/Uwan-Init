const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Logging to help debug API calls
const logRequest = (url) => {
  console.log(`Making API request to: ${url}`);
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    // URLs
    const currentWeatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    logRequest(currentWeatherUrl);
    logRequest(forecastUrl);

    // Fetch current weather
    const currentResponse = await fetch(currentWeatherUrl);

    if (!currentResponse.ok) {
      console.error(
        "Current weather response not OK:",
        await currentResponse.text()
      );
      throw new Error(`Weather data not available: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();
    console.log("Current weather data received:", currentData);

    // Fetch forecast data
    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      console.error("Forecast response not OK:", await forecastResponse.text());
      throw new Error(
        `Forecast data not available: ${forecastResponse.status}`
      );
    }

    const forecastData = await forecastResponse.json();
    console.log("Forecast data received:", forecastData);

    // Extract today's date
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    // Filter hourly forecast for today
    const hourlyForecast = forecastData.list.filter((item) =>
      item.dt_txt.includes(todayStr)
    );

    // Get daily forecast
    const dailyMap = new Map();
    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      const hour = item.dt_txt.split(" ")[1].split(":")[0];

      if (hour === "12" || !dailyMap.has(date)) {
        dailyMap.set(date, item);
      }
    });

    const dailyForecast = Array.from(dailyMap.values());

    return {
      current: {
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        visibility: currentData.visibility,
        weather: currentData.weather,
      },
      forecast: {
        hourly: hourlyForecast,
        daily: dailyForecast.map((day) => ({
          dt: day.dt,
          temp: {
            min: day.main.temp_min,
            max: day.main.temp_max,
          },
          weather: day.weather,
        })),
      },
      location: currentData.name,
    };
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    throw error;
  }
};

export const fetchWeatherByCity = async (city) => {
  try {
    const url = `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}&units=metric`;
    logRequest(url);

    const currentResponse = await fetch(url);

    if (!currentResponse.ok) {
      console.error(
        "City search response not OK:",
        await currentResponse.text()
      );
      throw new Error(`City not found: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();
    console.log("City data received:", currentData);

    const { lat, lon } = currentData.coord;

    // Getting weather data using coordinates
    return fetchWeatherByCoords(lat, lon);
  } catch (error) {
    console.error("Error fetching weather by city:", error);
    throw error;
  }
};
