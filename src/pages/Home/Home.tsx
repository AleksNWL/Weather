import Search from "../../components/Search/Search.tsx";
import { useEffect } from "react";
import { getCity } from "../../services/getCity.ts";
import { useCoordsCity } from "../../context/CoordsCityContext.tsx";
import MainTemperature from "../../components/MainTemperature/MainTemperature.tsx";
import DailyCarousel from "../../components/DailyCarousel/DailyCarousel.tsx";
import "./Home.scss";
import MainWeatherInfo from "../../components/MainWeatherInfo/MainWeatherInfo.tsx";
import SearcherPrecipitation from "../../components/SearcherPrecipitation/SearcherPrecipitation.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { PollenChart } from "../../components/PollenChart/PollenChart.tsx";
import WeekCarousel from "../../components/WeekCarousel/WeekCarousel.tsx";
import AqiSemiCircle from "../../components/AqiSemiCircle/AqiSemiCircle.tsx";
import { useWeather } from "../../context/WeatherContext.tsx";
import {usePollen} from "../../context/PollenContext.tsx";
import YesterdayWeather from "../../components/YesterweekWeather/YesterdayWeather.tsx";
import MagneticStorm from "../../components/MagneticStorm/MagneticStorm.tsx";


export default function Home() {
    const { setCity, setCoordinate } = useCoordsCity();
    const { setCoordinates } = useWeather();
    const { setCoords } = usePollen();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const detectedCity = await getCity(position.coords);
            if (detectedCity) {
                setCity(detectedCity);
                setCoordinate({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setCoords({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }
        });
    }, []);



    return (
        <>
            <div className="main-container">
                <Search />
                <div className="main-weather-container">
                    <div className="mini-container">
                        <MainTemperature />
                        <SearcherPrecipitation />
                    </div>
                    <MainWeatherInfo />
                </div>
                <DailyCarousel />
                <div className="addition-container">
                    <div className="pollen-container">
                        <PollenChart />
                    </div>
                    <div className="pollen-container">a</div>
                </div>
                <div className="week-carousel-container">
                    <WeekCarousel />
                </div>
                <div className="aqi-container">
                    <AqiSemiCircle />
                </div>
                <div className="magnetic-container">
                    <MagneticStorm/>
                </div>
            </div>
            <YesterdayWeather/>
            <Footer />
        </>
    );
}
