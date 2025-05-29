import { useWeather } from "../../context/WeatherContext";
import getIconWeather from "../../services/getIconWeather";
import styles from "./NextTenDay.module.scss";

export default function NextTenDay() {
    const { weather } = useWeather();
    if (!weather) return null;

    const { time, temperature_2m, weathercode, precipitation_probability, windgusts_10m } = weather.hourly;

    const days = [];
    for (let i = 0; i < time.length; i += 24) {
        days.push({
            time: time.slice(i, i + 24),
            temperature_2m: temperature_2m.slice(i, i + 24),
            weathercode: weathercode.slice(i, i + 24),
            precipitation_probability: precipitation_probability.slice(i, i + 24),
            windgusts_10m: windgusts_10m.slice(i, i + 24),
        });
    }

    const getLabelForDay = (index: number, dateString: string) => {
        const date = new Date(dateString);
        if (index === 0) return `Сегодня (${date.toLocaleDateString("ru-RU")})`;
        if (index === 1) return `Завтра (${date.toLocaleDateString("ru-RU")})`;
        return `${date.toLocaleDateString("ru-RU", { weekday: "short" })} (${date.toLocaleDateString("ru-RU")})`;
    };

    const getBlockData = (startHour: number, endHour: number, dayData: any) => {
        const range = [];
        for (let i = startHour; i <= endHour; i++) {
            range.push({
                time: dayData.time[i],
                temp: dayData.temperature_2m[i],
                code: dayData.weathercode[i],
                precipitation: dayData.precipitation_probability[i],
                wind: dayData.windgusts_10m[i],
            });
        }

        const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
        return {
            weathercode: range[0].code,
            temp: avg(range.map(x => x.temp)),
            precipitation: avg(range.map(x => x.precipitation)),
            wind: avg(range.map(x => x.wind)),
        };
    };

    const blocks = [
        { label: "Ночью", hours: [0, 5] },
        { label: "Утром", hours: [6, 11] },
        { label: "Днём", hours: [12, 17] },
        { label: "Вечером", hours: [18, 23] },
    ];

    return (
        <div className={styles.nextTenDay}>
            {days.slice(0, 10).map((day, i) => (
                <div key={i} className={styles.dayBlock}>
                    <h3 className={styles.date}>{getLabelForDay(i, day.time[0])}</h3>
                    <div className={styles.blocks}>
                        {blocks.map(({ label, hours }) => {
                            const data = getBlockData(hours[0], hours[1], day);
                            const iconInfo = getIconWeather(data.weathercode);

                            return (
                                <div key={label} className={styles.timeBlock}>
                                    <div className={styles.info}>
                                        <h4>{label}</h4>
                                        <p>Темп: {data.temp}°C</p>
                                        <p>Осадки: {data.precipitation}%</p>
                                        <p>Ветер: {data.wind} м/с</p>
                                        <p>{iconInfo.title}</p>
                                    </div>
                                    <img
                                        src={iconInfo.src}
                                        alt={iconInfo.title}
                                        className={styles.icon}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
