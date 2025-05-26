import drop from "/tools/drop.svg";
import wind from "/tools/wind.svg";
import pressure from "/tools/pressure.svg";
import {useWeather} from "../../context/WeatherContext.tsx";
import styles from "./MainWeatherInfo.module.scss";


export default function MainWeatherInfo() {
    const { weather } = useWeather();
    if (!weather) return <p>Загрузка погоды...</p>;

    const now = new Date();
    const indexNow = weather.hourly.time.findIndex((t: string) => new Date(t) > now);
    const nowPressure = Math.round(weather.hourly.pressure_msl[indexNow - 1] * 0.75006);

    return (
        <>
            <div className={styles.container}>
                <img src={drop} alt="drop" className={styles.icon} />
                <span className={styles.title}>{weather.hourly.relative_humidity_2m[indexNow]}%</span>
            </div>
            <div className={styles.container}>
                <img src={wind} alt="wind" className={styles.icon} />
                <span className={styles.title}>{weather.current_weather.windspeed} м/с</span>
            </div>
            <div className={styles.container}>
                <img src={pressure} alt="pressure" className={styles.icon} />
                <span className={styles.title}>{nowPressure} мм рт. ст.</span>
            </div>
        </>
    )
}