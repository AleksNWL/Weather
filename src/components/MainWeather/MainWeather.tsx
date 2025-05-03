import {useWeather} from "../../context/WeatherContext.tsx";


export default function MainWeather() {
    const { weather } = useWeather();
    if (!weather) return <p>Загрузка погоды...</p>;
    return (
        <div>
            <div>
                <p>Температура: {weather.current_weather.temperature}°C</p>
                <p>Код погоды: {weather.current_weather.weathercode}</p>
            </div>
        </div>
    )
}