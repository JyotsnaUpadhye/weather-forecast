import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import Forecast from "./forecast/Forecast";

function App() {
  const [city, setCity] = useState("Bengaluru");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic BG
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const toggleTemperatureUnit = () => {
    setUnits((prevUnits) => (prevUnits === 'metric' ? 'imperial' : 'metric'));
  };

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
              <div className="section section__inputs">
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City...." />
                <button onClick={toggleTemperatureUnit}>{`°${units === "metric" ? "F" : "C"}`}</button>
              </div>

              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="WeatherIcon"></img>
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"} `}</h1>
                </div>
              </div>

              {/*bottom description */}
              <Descriptions weather = {weather} units = {units} />
              <Forecast city={city} units={units} toggleTemperatureUnit={toggleTemperatureUnit} />
             </div>
          )
         
        }
        
      </div>
    </div>
  );
}

export default App;
