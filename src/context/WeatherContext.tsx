import { createContext, useContext, useState } from "react";
import {CoordinatesType} from "../types/coordinatesType.ts";
import {getWeather} from "../services/getWeather.ts";

type WeatherData = any;

interface WeatherContextType {
    weather: WeatherData | null;
    setCoordinates: (coords: CoordinatesType) => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const setCoordinates = async (coords: CoordinatesType) => {
        const data = await getWeather(coords);
        if (data) {
            setWeather(data);
            console.log(data);
        }
    };

    return (
        <WeatherContext.Provider value={{ weather, setCoordinates }}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) throw new Error("useWeather must be used within WeatherProvider");
    return context;
}