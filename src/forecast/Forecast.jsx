import React, { useEffect, useState } from 'react';
import './forecast.css';


const Forecast = ({ city, onToggleTemperatureUnit, units }) => {
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const getFormattedWeatherForecast = async (city, cnt, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${cnt}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);

      if (data.cod === '200') {
        // Update the state with the forecast data
        setForecastData(data.list);
      } else {
        console.error('Failed to fetch weather data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
    // Call the prop function passed from the parent component
    onToggleTemperatureUnit();
  };

  useEffect(() => {
    // Fetch the weather forecast for 5 days when the component mounts
    getFormattedWeatherForecast(city, 5);
  }, [city]); // Include 'city' in the dependency array

  return (
    <div className="section section__forecast">
      {forecastData.map((forecast, index) => (
        <div className="card1" key={index} onClick={toggleTemperatureUnit}>
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
              <small>{new Date(forecast.dt_txt).toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
