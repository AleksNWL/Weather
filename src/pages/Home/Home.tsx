import Search from "../../components/Search/Search.tsx";
import {useEffect, useState} from "react";
import {getCity} from "../../services/getCity.ts";
import MainTemperature from "../../components/MainTemperature/MainTemperature.tsx";
import DailyCarousel from "../../components/DailyCarousel/DailyCarousel.tsx";
import "./Home.scss"
import MainWeatherInfo from "../../components/MainWeatherInfo/MainWeatherInfo.tsx";
import SearcherPrecipitation from "../../components/MainTemperature/SearcherPrecipitation/SearcherPrecipitation.tsx";


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
            <div className="main-weather-container">
                <div className="mini-container">
                    <MainTemperature/>
                    <SearcherPrecipitation/>
                </div>
                <MainWeatherInfo/>
            </div>
            <DailyCarousel/>
        </div>
    )
}