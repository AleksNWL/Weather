import axios from "axios";
import { CoordinatesTypes } from "../types/coordinatesTypes.ts";

const CACHE_KEY = "airDataCache";
const CACHE_TTL = 10 * 60 * 1000;

export const getAirData = async (coordinates: CoordinatesTypes) => {
    const cache = localStorage.getItem(CACHE_KEY);
    const now = Date.now();

    if (cache) {
        const { timestamp, coords, data } = JSON.parse(cache);
        const isSameLocation = coords.latitude === coordinates.latitude && coords.longitude === coordinates.longitude;

        if (now - timestamp < CACHE_TTL && isSameLocation) {
            return data;
        }
    }

    const endpoint = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const params = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current: "us_aqi,uv_index",
    };

    try {
        const { data } = await axios.get(endpoint, { params });
        const result = {
            aqi: data.current?.us_aqi ?? null,
            uv: data.current?.uv_index ?? null,
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: now,
            coords: coordinates,
            data: result,
        }));

        return result;
    } catch (error) {
        console.error("Ошибка при получении данных воздуха:", error);
        return { aqi: null, uv: null };
    }
};
