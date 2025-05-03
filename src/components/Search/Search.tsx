import useInput from "../../hooks/useInput.tsx";
import {getCoordinates} from "../../services/getCoordinates.ts";
import {useState} from "react";


interface SearchProps {
    cityName?: string;
}

export default function Search({ cityName }: SearchProps) {
    const [placeHolderCity, setPlaceHolderCity] = useState(cityName?.trim() || "Введите город...");
    const city = useInput("");
    const postCity = () => {
        getCoordinates(city.value);
        setPlaceHolderCity(city.value);
        city.setValue("");
    }


    return (
        <>
            <input type="text" placeholder={placeHolderCity} {...city} />
            <button onClick={postCity}>Поиск</button>
        </>
    )
}