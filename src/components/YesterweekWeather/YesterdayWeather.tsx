import { useEffect, useState } from "react";
import { useCoordsCity } from "../../context/CoordsCityContext.tsx";
import { getLastWeekWeatherAtSameTime } from "../../services/getYesterweekWeather.ts";
import drop from "../../../public/img/tools/drop.svg";
import wind from "../../../public/img/tools/wind.svg";
import pressure from "../../../public/img/tools/pressure.svg";
import thermometer from "../../../public/img/tools/thermometer.svg";
import getIconWeather from "../../services/getIconWeather.ts";


export default function YesterdayWeather() {
    const { coordinate } = useCoordsCity();
    const [yesterweekWeather, setYesterweekWeather] = useState<any>(null);
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
            <h3>Погода вчера в это же время:</h3>
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
