import useInput from "../../hooks/useInput.tsx";
import {getCoordinates} from "../../services/getCoordinates.ts";
import {useState, useEffect} from "react";
import {useWeather} from "../../context/WeatherContext.tsx";


interface SearchProps {
    cityName?: string;
}

export default function Search({ cityName }: SearchProps) {
    const [placeHolderCity, setPlaceHolderCity] = useState(cityName?.trim() || "Введите город...");
    const city = useInput("");
    const { setCoordinates } = useWeather();


    const postCity = async () => {
        const coords = await getCoordinates(city.value);
        if (coords) {
            setCoordinates(coords);
            setPlaceHolderCity(city.value);
            city.setValue("");
        }
    }

    useEffect(() => {
        if (cityName) {
            (async () => {
                const coords = await getCoordinates(cityName);
                if (coords) {
                    setCoordinates(coords);
                    setPlaceHolderCity(cityName);
                    city.setValue("");
                }
            })();
        }
    }, [cityName]);


    return (
        <>
            <input type="text" placeholder={placeHolderCity} {...city} />
            <button onClick={postCity}>Поиск</button>
        </>
    )
}