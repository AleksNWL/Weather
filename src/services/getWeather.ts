import axios from "axios";
import {CoordinatesType} from "../types/coordinatesType.ts";


export const getWeather = async (coordinates: CoordinatesType) => {
    if (!coordinates) {
        return;
    }

    const endpoint = 'https://api.open-meteo.com/v1/forecast';
    const params = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current_weather: true,
        hourly: "apparent_temperature,temperature_2m,weathercode",
        timezone: "auto"
    };

    const { data } = await axios.get(endpoint, { params });

    console.log(data);
}