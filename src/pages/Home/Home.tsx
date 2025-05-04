import Search from "../../components/Search/Search.tsx";
import {useEffect, useState} from "react";
import {getCity} from "../../services/getCity.ts";
import MainWeather from "../../components/MainWeather/MainWeather.tsx";
import DailyCarousel from "../../components/DailyCarousel/DailyCarousel.tsx";
import "./Home.scss"


export default function Home() {
    const [city, setCity] = useState("");
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const result = await getCity(position.coords);
            if (result) return setCity(result);
        })
    }, [])

    return (
        <div className="main-container">
            <Search cityName={ city }/>
            <MainWeather/>
            <DailyCarousel/>
        </div>
    )
}