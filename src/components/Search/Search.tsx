import useInput from "../../hooks/useInput.tsx";
import {getCoordinates} from "../../services/getCoordinates.ts";
import {useState, useEffect} from "react";
import {useWeather} from "../../context/WeatherContext.tsx";
import "./Search.scss";
import search from "../../../public/img/tools/search.svg"


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
        <div className="search-container">
            <input type="text" placeholder={placeHolderCity} {...city} className="search-input"/>
            <img onClick={postCity} src={search} alt={search} className="search-icon" />
        </div>
    )
}