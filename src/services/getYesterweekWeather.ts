import axios from "axios";
import { CoordinatesTypes } from "../types/coordinatesTypes.ts";

export const getLastWeekWeatherAtSameTime = async (coordinates: CoordinatesTypes) => {
    if (!coordinates) return;

    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);

    const dateStr = lastWeek.toISOString().split("T")[0];
    const hour = now.getHours();

    const endpoint = 'https://archive-api.open-meteo.com/v1/archive';
    const params = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        start_date: dateStr,
        end_date: dateStr,
        hourly: "temperature_2m,apparent_temperature,weathercode,pressure_msl,relative_humidity_2m,windspeed",
        timezone: "auto"
    };

    try {
        const { data } = await axios.get(endpoint, { params });

        if (!data.hourly || !data.hourly.time) {
            console.warn("Данные не содержат почасовых значений");
            return null;
        }

        const index = data.hourly.time.findIndex((t: string) => {
            const date = new Date(t);
            console.log(data)
            return date.getHours() === hour;
        });

        if (index === -1) {
            console.warn("Не найден нужный час в данных");
            return null;
        }

        const result = {
            temperature_2m: data.hourly.temperature_2m?.[index],
            apparent_temperature: data.hourly.apparent_temperature?.[index],
            weathercode: data.hourly.weathercode?.[index],
            pressure_msl: data.hourly.pressure_msl?.[index],
            relative_humidity_2m: data.hourly.relative_humidity_2m?.[index],
            windspeed: data.hourly.windspeed?.[index],
        };
        console.log(result);
        return result;

    } catch (error) {
        console.error("Ошибка при получении архивных данных:", error);
        return null;
    }
};
