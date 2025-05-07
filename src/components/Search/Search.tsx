import {getCoordinates} from "../../services/getCoordinates.ts";
import {useState, useEffect} from "react";
import {useWeather} from "../../context/WeatherContext.tsx";
import "./Search.scss";
import search from "../../../public/img/tools/search.svg"
import {helpSearch} from "../../services/helpSearch.ts";


interface SearchProps {
    cityName?: string;
}

export default function Search({ cityName }: SearchProps) {
    const [placeHolderCity, setPlaceHolderCity] = useState(cityName?.trim() || "Введите город...");
    const { setCoordinates } = useWeather();
    const [city, setCity] = useState("");


    const postCity = async () => {
        const coords = await getCoordinates(city);
        if (coords) {
            setCoordinates(coords);
            setPlaceHolderCity(city);
            setCity("");
        }
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            (async () => {
               try {
                   await postCity();
               } catch (err) {
                   console.error(err);
               }
            })()
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        (async () => {
           try {
               await helpSearch(e.target.value);
           } catch (err) {
               console.error(err);
           }
        })()
    }

    useEffect(() => {
        if (cityName) {
            (async () => {
                const coords = await getCoordinates(cityName);
                if (coords) {
                    setCoordinates(coords);
                    setPlaceHolderCity(cityName);
                    setCity("");
                }
            })();
        }
    }, [cityName]);


    return (
        <div className="search-container" onKeyDown={keyDownHandler}>
            <input type="text" placeholder={placeHolderCity} onChange={onChange} value={city} className="search-input"/>
            <img onClick={postCity} src={search} alt={search} className="search-icon" />
        </div>
    )
}