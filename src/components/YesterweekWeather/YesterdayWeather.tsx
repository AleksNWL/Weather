import { useEffect, useState } from "react";
import { useCoordsCity } from "../../context/CoordsCityContext.tsx";
import { getLastWeekWeatherAtSameTime } from "../../services/getYesterweekWeather.ts";

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

    return (
        <div>
            <h3>Погода вчера в это же время:</h3>
            <p>Температура: {yesterweekWeather.temperature_2m}°C</p>
            <p>Ощущается как: {yesterweekWeather.apparent_temperature}°C</p>
            <p>Давление: {yesterweekWeather.pressure_msl} гПа</p>
            <p>Влажность: {yesterweekWeather.relative_humidity_2m}%</p>
            <p>Ветер: {yesterweekWeather.windspeed} м/с</p>
        </div>
    );
}
