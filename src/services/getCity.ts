import axios from "axios";
import { CoordinatesTypes } from "../types/coordinatesTypes.ts";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export const getCity = async (coordinates: CoordinatesTypes) => {
    const endpoint = "https://api.geoapify.com/v1/geocode/reverse";
    const params = {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        lang: "ru",
        apiKey: GEOAPIFY_API_KEY,
    };

    try {
        const { data } = await axios.get(endpoint, { params });

        const city =
            data.features?.[0]?.properties?.city ||
            data.features?.[0]?.properties?.county ||
            data.features?.[0]?.properties?.state;

        return city || null;
    } catch (error) {
        console.error("Geoapify error:", error);
        return null;
    }
};
