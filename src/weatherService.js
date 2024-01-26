

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormattedWeatherData = async (city,cnt, units = "metric") => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=5&appid=${process.env.REACT_APP_API_KEY}&units=${units}`;

    const data = await fetch(URL).then((res) => res.json()).then((data) => data);

    const {
        weather,
        main: {temp, temp_min, temp_max, pressure, humidity},
        wind: {speed, deg},
        sys: {country},
        name,
    } = data;

    const {description, icon} = weather[0];

    return {
        description, iconURL: makeIconURL(icon), temp, temp_min, temp_max, pressure, humidity, speed, deg, country, name,
    };

};

export { getFormattedWeatherData };