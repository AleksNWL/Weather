import {useWeather} from "../../context/WeatherContext.tsx";


export default function Visibility() {
    const { weather } = useWeather();

    if (!weather) return <div>Loading...</div>;

    console.log(weather.hourly.visibility)

    return (
        <>
            <div>

            </div>
        </>
    )
}