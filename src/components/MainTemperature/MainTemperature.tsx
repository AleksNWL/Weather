import {useWeather} from "../../context/WeatherContext.tsx";
import styles from "./MainTemperature.module.scss";
import getIconWeather from "../../services/getIconWeather.ts";


export default function MainTemperature() {
    const { weather } = useWeather();
    if (!weather) return <p>Загрузка погоды...</p>;

    const now = new Date();
    const indexNow = weather.hourly.time.findIndex((t: string) => new Date(t) > now);

    const weatherInfo = getIconWeather(weather.current_weather.weathercode)


    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                {Math.round(weather.current_weather.temperature) >= 0
                    ? <span className={styles.temperature}>+{Math.round(weather.current_weather.temperature)}°C</span>
                    : <span className={styles.temperature}>{Math.round(weather.current_weather.temperature)}°C</span>
                }
                {Math.round(weather.hourly.apparent_temperature[indexNow]) >= 0
                    ? <span className={styles.apparentTemperature}>Ощущается как +{Math.round(weather.hourly.apparent_temperature[indexNow])}°C</span>
                    : <span className={styles.apparentTemperature}>Ощущается как {Math.round(weather.hourly.apparent_temperature[indexNow])}°C</span>
                }
            </div>
            <img src={weatherInfo.src} alt={weatherInfo.icon} className={styles.icon} />
        </div>
    )
}