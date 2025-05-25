import axios from "axios";
import {CoordinatesTypes} from "../types/coordinatesTypes.ts";


export const getAirAQI = async (coordinates: CoordinatesTypes) => {
    const endpoint = 'https://air-quality-api.open-meteo.com/v1/air-quality';
    const params = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current: "us_aqi",
    }

    try {
        const { data } = await axios.get(endpoint, { params });
        return data.current.us_aqi;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}