import axios from "axios";
import {CoordinatesType} from "../types/coordinatesType.ts";


export const getCity = async (coordinates: CoordinatesType) => {
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
    }
}