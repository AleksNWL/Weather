    import Search from "../../components/Search/Search.tsx";
    import {useEffect, useState} from "react";
    import {getCity} from "../../services/getCity.ts";
    import MainTemperature from "../../components/MainTemperature/MainTemperature.tsx";
    import DailyCarousel from "../../components/DailyCarousel/DailyCarousel.tsx";
    import "./Home.scss"
    import MainWeatherInfo from "../../components/MainWeatherInfo/MainWeatherInfo.tsx";
    import SearcherPrecipitation from "../../components/SearcherPrecipitation/SearcherPrecipitation.tsx";
    import Footer from "../../components/Footer/Footer.tsx";
    import Pollen from "../../components/Pollen/Pollen.tsx";
    import {PollenChart} from "../../components/PollenChart/PollenChart.tsx";


    export default function Home() {
        const [city, setCity] = useState("");
        useEffect(() => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const result = await getCity(position.coords);
                if (result) return setCity(result);
            })
        }, [])

        return (
            <>
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
                    <div className="addition-container">
                        <div className="pollen-container">
                            <Pollen />
                        </div>
                        <div className="pollen-container">
                            <h2 style={{fontSize:"1.2rem"}}>Активность пыльцы в {city}</h2>
                            <PollenChart />
                        </div>
                        <div className="pollen-container">
                            a
                        </div>
                    </div>

                </div>
                <Footer />
            </>
        )
    }