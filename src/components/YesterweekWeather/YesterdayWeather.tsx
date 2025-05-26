import { useEffect, useState } from "react";
import { useCoordsCity } from "../../context/CoordsCityContext.tsx";
import { getLastWeekWeatherAtSameTime } from "../../services/getYesterweekWeather.ts";
import drop from "/tools/drop.svg";
import wind from "/tools/wind.svg";
import pressure from "/tools/pressure.svg";
import thermometer from "/tools/thermometer.svg";
import getIconWeather from "../../services/getIconWeather.ts";

interface WeatherProps {
    temperature_2m: number;
    apparent_temperature: number;
    weathercode: number;
    pressure_msl: number;
    relative_humidity_2m: number;
    windspeed: number;
}

export default function YesterdayWeather() {
    const { coordinate } = useCoordsCity();
    const [yesterweekWeather, setYesterweekWeather] = useState<WeatherProps | null | undefined>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (coordinate) {
                const data = await getLastWeekWeatherAtSameTime(coordinate);
                setLoading(false);
                setYesterweekWeather(data);
            }
        };

        fetchData();
    }, [coordinate]);

    if (loading) return <div>Загрузка...</div>;
    if (!yesterweekWeather) return <div>Нет данных за вчера</div>;

    const weatherInfo = getIconWeather(yesterweekWeather.weathercode);

    return (
        <div>
            <div>
                <img src={thermometer} alt="thermometer" />
                <span>{yesterweekWeather.temperature_2m}°C</span>
            </div>
            <div>
                <img src={drop} alt="drop" />
                <span>{yesterweekWeather.relative_humidity_2m}%</span>
            </div>
            <div>
                <img src={pressure} alt="pressure" />
                <span>{Math.round(yesterweekWeather.pressure_msl * 0.75006)} мм рт. ст.</span>
            </div>
            <div>
                <img src={wind} alt="wind" />
                <span>{yesterweekWeather.windspeed} м/с</span>
            </div>
            <img src={weatherInfo.src} alt={weatherInfo.icon} className="weather-icon" />
        </div>
    );
}
