import { useWeather } from "../../context/WeatherContext.tsx";
import { getAllDay } from "../../services/getAllDay.ts"
import "./DailyCarousel.scss"


export default function DailyCarousel() {
    const { weather } = useWeather();
    if (!weather) return <div>Loading...</div>;

    const hourly = getAllDay(weather.hourly);

    return (
        <div className="container-carousel">
            <div className="container-carousel__item">
                <span>Сейчас</span>
                <br/>
                <span>{weather.current_weather.weathercode}</span>
                <br/>
                <span>{Math.round(weather.current_weather.temperature)}°C</span>
            </div>
            {hourly.time.map((time, i) => ((
                <div key={time} className="container-carousel__item">
                    <span>{new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    <br/>
                    <span>{hourly.weathercode[i]}</span>
                    <br/>
                    <span>{Math.round(hourly.temperature_2m[i])}°C</span>
                </div>
            )))}
        </div>
    )
}