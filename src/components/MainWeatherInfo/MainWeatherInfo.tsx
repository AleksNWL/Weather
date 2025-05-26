import drop from "/tools/drop.svg";
import wind from "/tools/wind.svg";
import pressure from "/tools/pressure.svg";
import {useWeather} from "../../context/WeatherContext.tsx";
import "./MainWeatherInfo.scss";


export default function MainWeatherInfo() {
    const { weather } = useWeather();
    if (!weather) return <p>Загрузка погоды...</p>;

    const now = new Date();
    const indexNow = weather.hourly.time.findIndex((t: string) => new Date(t) > now);
    const nowPressure = Math.round(weather.hourly.pressure_msl[indexNow - 1] * 0.75006);

    return (
        <div className="container-mini-weather">
            <div className="container-mini-weather-info">
                <img src={drop} alt="drop" className="icon-tools" />
                <span>{weather.hourly.relative_humidity_2m[indexNow]}%</span>
            </div>
            <div className="container-mini-weather-info">
                <img src={wind} alt="wind" className="icon-tools" />
                <span>{weather.current_weather.windspeed} м/с</span>
            </div>
            <div className="container-mini-weather-info">
                <img src={pressure} alt="pressure" className="icon-tools" />
                <span>{nowPressure} мм рт. ст.</span>
            </div>
        </div>
    )
}