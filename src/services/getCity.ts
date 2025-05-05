import axios from "axios";
import {CoordinatesTypes} from "../types/coordinatesTypes.ts";


export const getCity = async (coordinates: CoordinatesTypes) => {
    const endpoint = 'https://nominatim.openstreetmap.org/reverse';
    const params = {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        "accept-language": 'ru',
        format: "json",
    }

    try {
        const { data } = await axios.get(endpoint, { params });
        const address: string = data.address.city;
        return address;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}