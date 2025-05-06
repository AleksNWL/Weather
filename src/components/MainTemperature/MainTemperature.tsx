import {useWeather} from "../../context/WeatherContext.tsx";
import "./MainTemperature.scss";
import getIconWeather from "../../services/getIconWeather.ts";


export default function MainTemperature() {
    const { weather } = useWeather();
    if (!weather) return <p>Загрузка погоды...</p>;

    const now = new Date();
    const indexNow = weather.hourly.time.findIndex((t: string) => new Date(t) > now);

    return (
        <div className="container-main-temperature">
            <div className="container-main-weather-info">
                {Math.round(weather.current_weather.temperature) >= 0
                    ? <span className="main-temperature">+{Math.round(weather.current_weather.temperature)}°C</span>
                    : <span className="main-temperature">{Math.round(weather.current_weather.temperature)}°C</span>
                }
                {Math.round(weather.hourly.apparent_temperature[indexNow]) >= 0
                    ? <span className="main-apparent-temperature">Ощущается как +{Math.round(weather.hourly.apparent_temperature[indexNow])}°C</span>
                    : <span className="main-apparent-temperature">Ощущается как {Math.round(weather.hourly.apparent_temperature[indexNow])}°C</span>
                }
            </div>
            <img src={getIconWeather(weather.current_weather.weathercode)} alt={weather.current_weather.weathercode.toString()} className="weather-icon" />
        </div>
    )
}