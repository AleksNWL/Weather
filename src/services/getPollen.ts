import axios from "axios";
import {CoordinatesTypes} from "../types/coordinatesTypes.ts";


export const getPollen = async (coordinates: CoordinatesTypes) => {
    const endpoint = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const params = {
        hourly: "alder_pollen,birch_pollen,grass_pollen,mugwort_pollen",
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
    }

    try {
        const { data } = await axios.get(endpoint, { params });
        console.log(data.hourly)
        return data.hourly;
    } catch (error) {
        console.error(error);
        return error;
    }
}