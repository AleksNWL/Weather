import {useWeather} from "../../context/WeatherContext.tsx";
import "./MainWeather.scss";
import getIconWeather from "../../services/getIconWeather.ts";
import wind from "../../../public/img/tools/wind.svg";
import drop from "../../../public/img/tools/drop.svg";


export default function MainWeather() {
    const { weather } = useWeather();
    if (!weather) return <p>Загрузка погоды...</p>;

    const now = new Date();
    const indexNow = weather.hourly.time.findIndex((t: string) => new Date(t) > now);
    const nowPressure = Math.round(weather.hourly.pressure_msl[indexNow - 1] * 0.75006);

    return (
        <div className="container-main-weather">
            <div className="container-main-weather-data">
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
                <div className="container-mini-weather">
                    <div className="container-mini-weather-info">
                        <img src={drop} alt="drop" />
                        <span>{weather.hourly.relative_humidity_2m[indexNow]}%</span>
                    </div>
                    <div className="container-mini-weather-info">
                        <img src={wind} alt="wind" />
                        <span>{weather.current_weather.windspeed} м/с</span>
                    </div>
                    <div className="container-mini-weather-info">
                        <span>{nowPressure} мм рт. ст.</span>
                    </div>
                </div>
            </div>
            <img src={getIconWeather(weather.current_weather.weathercode)} alt={weather.current_weather.weathercode} className="weather-icon" />
        </div>
    )
}