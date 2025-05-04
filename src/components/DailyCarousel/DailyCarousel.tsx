import { useWeather } from "../../context/WeatherContext.tsx";
import { getAllDay } from "../../services/getAllDay.ts"
import "./DailyCarousel.scss"
import getIconWeather from "../../services/getIconWeather.ts";


export default function DailyCarousel() {
    const { weather } = useWeather();
    if (!weather) return <div>Loading...</div>;

    const hourly = getAllDay(weather.hourly);

    return (
        <div className="container-carousel">
            <div className="container-carousel__item">
                <span>Сейчас</span>
                <div>
                    <img src={getIconWeather(weather.current_weather.weathercode)} alt={weather.current_weather.weathercode} />
                </div>
                <span>{Math.round(weather.current_weather.temperature)}°C</span>
            </div>
            {hourly.time.map((time, i) => ((
                <div key={time} className="container-carousel__item">
                    <span>{new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    <div>
                        <img src={getIconWeather(hourly.weathercode[i])} alt={hourly.weathercode[i].toString()} />
                    </div>
                    <span>{Math.round(hourly.temperature_2m[i])}°C</span>
                </div>
            )))}
        </div>
    )
}