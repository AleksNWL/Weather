import { useEffect, useState } from "react";
import styles from "./Home.module.scss";

import Search from "../../components/Search/Search.tsx";
import { getCity } from "../../services/getCity.ts";
import { useCoordsCity } from "../../context/CoordsCityContext.tsx";
import MainTemperature from "../../components/MainTemperature/MainTemperature.tsx";
import DailyCarousel from "../../components/DailyCarousel/DailyCarousel.tsx";
import MainWeatherInfo from "../../components/MainWeatherInfo/MainWeatherInfo.tsx";
import SearcherPrecipitation from "../../components/SearcherPrecipitation/SearcherPrecipitation.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { PollenChart } from "../../components/PollenChart/PollenChart.tsx";
import WeekCarousel from "../../components/WeekCarousel/WeekCarousel.tsx";
import AqiSemiCircle from "../../components/AqiSemiCircle/AqiSemiCircle.tsx";
import { useWeather } from "../../context/WeatherContext.tsx";
import { usePollen } from "../../context/PollenContext.tsx";
import YesterdayWeather from "../../components/YesterweekWeather/YesterdayWeather.tsx";
import MagneticStorm from "../../components/MagneticStorm/MagneticStorm.tsx";
import Visibility from "../../components/Visibility/Visibility.tsx";
import MoonPhases from "../../components/PhasesMoon/PhasesMoon.tsx";
import UVIndex from "../../components/UVIndex/UVIndex.tsx";
import Horoscope from "../../components/Horoscope/Horoscope.tsx";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme.tsx";
import Like from "../../components/Like/Like.tsx";
import FavoritesList from "../../components/FavoritesList/FavoritesList.tsx";

export default function Home() {
    const { setCity, setCoordinate } = useCoordsCity();
    const { setCoordinates } = useWeather();
    const { setCoords } = usePollen();

    const [isSearch, setIsSearch] = useState(false);

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

        const handleResize = () => {
            setIsSearch(window.innerWidth <= 1080);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.mainContainer}>
            {isSearch ? (
                <div className={styles.search}>
                    <div className={styles.helpContainer}>
                        <div className={styles.likeContainer}>
                            <Like />
                            <FavoritesList />
                        </div>
                        <ToggleTheme />
                    </div>
                    <Search />
                </div>
            ) : (
                <div className={styles.search}>
                    <div className={styles.likeContainer}>
                        <Like />
                        <FavoritesList />
                    </div>
                    <Search />
                    <ToggleTheme />
                </div>
            )}

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

            <div className={styles.additionalContainer} style={{ height: "100%" }}>
                <div className={styles.middleContainer}>
                    <YesterdayWeather />
                </div>

                <div className={styles.littleContainer}>
                    <span className={styles.heading}>Качество воздуха</span>
                    <AqiSemiCircle />
                </div>
                <div className={`${styles.littleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>UV-индекс</span>
                    <UVIndex />
                </div>

                <div className={styles.highContainer}>
                    <PollenChart />
                </div>

                <div className={`${styles.littleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>Магнитное поле</span>
                    <MagneticStorm />
                </div>
                <div className={`${styles.littleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>Фаза луны</span>
                    <MoonPhases />
                </div>

                <div className={`${styles.middleContainer} ${styles.innerContainer}`}>
                    <span className={styles.heading}>Видимость на дорогах</span>
                    <Visibility />
                </div>
                <div className={`${styles.highContainer} ${styles.innerContainer}`}>
                    <Horoscope />
                </div>
            </div>

            <div className={styles.weeklyContainer}>
                <WeekCarousel />
            </div>

            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
}
