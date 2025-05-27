import Search from "../../components/Search/Search.tsx";
import { useEffect } from "react";
import { getCity } from "../../services/getCity.ts";
import { useCoordsCity } from "../../context/CoordsCityContext.tsx";
import MainTemperature from "../../components/MainTemperature/MainTemperature.tsx";
import DailyCarousel from "../../components/DailyCarousel/DailyCarousel.tsx";
import styles from "./Home.module.scss";
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
import Visibility from "../../components/Visibility/Visibility.tsx";
import MoonPhases from "../../components/PhasesMoon/PhasesMoon.tsx";
import UVIndex from "../../components/UVIndex/UVIndex.tsx";
import Horoscope from "../../components/Horoscope/Horoscope.tsx";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme.tsx";


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
        <div className={styles.mainContainer}>
            <div>
                <ToggleTheme/>
            </div>
            <div className={styles.search}>
                <Search />
            </div>

            <div className={styles.mainWeather}>
                <div className={styles.mainTemperature}>
                    <MainTemperature />
                    <SearcherPrecipitation />
                </div>
                <div className={styles.mainWeatherInfo}>
                    <MainWeatherInfo />
                </div>
            </div>

            <div className={styles.dailyContainer}>
                <DailyCarousel />
            </div>

            <div className={styles.additionalContainer} style={{height: "100%"}} >
                <div className={styles.middleContainer}>
                    <YesterdayWeather/>
                </div>

                <div className={styles.littleContainer}>
                    <span className={styles.heading}>Качество воздуха</span>
                    <AqiSemiCircle/>
                </div>
                <div className={`${styles.littleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>UV-индекс</span>
                    <UVIndex/>
                </div>

                <div className={styles.highContainer}>
                    <PollenChart />
                </div>
            </div>

            <div className={styles.weeklyContainer}>
                <WeekCarousel />
            </div>

            <div className={styles.additionalContainer}>

                <div className={`${styles.littleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>Магнитное поле</span>
                    <MagneticStorm/>
                </div>
                <div className={`${styles.littleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>Фаза луны</span>
                    <MoonPhases/>
                </div>

                <div className={`${styles.middleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>Видимость на дорогах</span>
                    <Visibility/>
                </div>
                <div className={`${styles.highContainer} ${styles.innerContainer}`}>
                    <Horoscope/>
                </div>
            </div>
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
}
