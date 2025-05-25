import axios from "axios";
import {CoordinatesTypes} from "../types/coordinatesTypes.ts";


export const getWeather = async (coordinates: CoordinatesTypes) => {
    if (!coordinates) {
        return;
    }

    const endpoint = 'https://api.open-meteo.com/v1/forecast';
    const params = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current_weather: true,
        hourly: "temperature_2m,apparent_temperature,precipitation,precipitation_probability,weathercode,windgusts_10m,visibility,pressure_msl,relative_humidity_2m",
        timezone: "auto",
        forecast_days: 10
    };

    try {
        const { data } = await axios.get(endpoint, { params });
        return data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}