import {getCoordinates} from "../../services/getCoordinates.ts";
import {useState, useEffect} from "react";
import {useWeather} from "../../context/WeatherContext.tsx";
import "./Search.scss";
import search from "../../../public/img/tools/search.svg"
import {helpSearch} from "../../services/helpSearch.ts";
import {HelpSearchType} from "../../types/helpSearch.ts";
import {usePollen} from "../../context/PollenContext.tsx";


interface SearchProps {
    cityName?: string;
}

export default function Search({ cityName }: SearchProps) {
    const [placeHolderCity, setPlaceHolderCity] = useState(cityName?.trim() || "Введите город...");
    const { setCoordinates } = useWeather();
    const { setCoords } = usePollen();
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState<Array<HelpSearchType>>([]);


    const postCity = async () => {
        const coords = await getCoordinates(city);
        if (coords) {
            setCoordinates(coords);
            setCoords(coords);
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

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);

        if (value.length >= 3) {
            try {
                const result = await helpSearch(value);
                setSuggestions(result);
            } catch (err) {
                console.error(err);
            }
        } else {
            setSuggestions([]);
        }
    }

    const onClickSuggestion = (lat: number, lon: number, formatted: string) => {
        if (lat && lon) {
            try {
                const coords = {
                    latitude: lat,
                    longitude: lon,
                }
                setCoordinates(coords);
                setCoords(coords);
                setPlaceHolderCity(formatted);
                setCity(formatted);
                setSuggestions([]);
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        if (cityName) {
            (async () => {
                const coords = await getCoordinates(cityName);
                if (coords) {
                    setCoordinates(coords);
                    setCoords(coords);
                    setPlaceHolderCity(cityName);
                    setCity("");
                }
            })();
        }
    }, [cityName]);


    return (
        <div className="search-container">
            <div onKeyDown={keyDownHandler} className="search-input-container">
                <input type="text" placeholder={placeHolderCity} onChange={onChange} value={city} className={`search-input ${suggestions.length > 0 ? "helper-on" : ""}`} />
                <img onClick={postCity} src={search} alt={search} className="search-icon" />
            </div>
            <div>
                {suggestions.length > 0 && (
                    <div className="search-suggestions">
                        {suggestions.map((item, index) => (
                            <div key={index} className="search-suggestion" onClick={() => (onClickSuggestion(item.lat, item.lon, item.formatted))}>
                                {item.formatted}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}