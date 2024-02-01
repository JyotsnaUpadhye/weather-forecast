import React, { useEffect, useState } from 'react';
import './forecast.css';

const Forecast = ({ city, onToggleTemperatureUnit, units }) => {
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const getFormattedWeatherForecast = async (city, cnt, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.cod === '200') {
        // Update the state with the forecast data
        const today = new Date().getDate(); // Get the current day
        const tomorrowIndex = data.list.findIndex(
          (forecast) => new Date(forecast.dt * 1000).getDate() === today + 1
        );

        // Update the state with the forecast data excluding today
        setForecastData(data.list.slice(tomorrowIndex));
      } else if (data.cod === '404') {
        // Alert the user that the city name does not exist
        alert(`${city} not found. Please enter a valid city name.`);
      } else {
        console.error('Failed to fetch weather data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    // Fetch the weather forecast for 5 days when the component mounts
    getFormattedWeatherForecast(city, 5);
  }, [city]); // Include 'city' in the dependency array

  // Extract the next 5 days from the forecastData array
  const next5DaysData = forecastData.slice(0, 5);

  return (
    <div className="section section__forecast">
      {next5DaysData.map((forecast, index) => (

        <div className="card1" key={index}>
          <div className="forecast__card1-icon1">
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt="Icon"
            />
            <div className="forecast_temp">
              <small>
                {units === 'metric'
                  ? `${forecast.main.temp.toFixed()} °C`
                  : `${(forecast.main.temp.toFixed() * 9) / 5 + 32} °F`}
              </small>
            </div>
            <small>{forecast.weather[0].description}</small>
            <div className="forecast_date">
              {/* Calculate the specific date based on the index */}
              <small>{new Date(forecast.dt * 1000 + index * 22 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</small>
            </div>
          </div >
        </div >
      ))
      }
    </div >
  );
};

export default Forecast;