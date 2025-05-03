import axios from 'axios';
import {getCity} from "./getCity.ts";


export const getCoordinates = async (city: string) => {
    if (!city.trim()) {
        return;
    }

    const endpoint = 'https://geocoding-api.open-meteo.com/v1/search';
    const params = {
        name: city,
        count: 1,
        language: 'ru',
        format: 'json',
    };

    try {
        const { data } = await axios.get(endpoint, { params });

        if (data?.results?.length > 0) {
            const coordinates = data.results[0];
            await getCity(coordinates);
            return coordinates;
        } else {
            return null;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
}