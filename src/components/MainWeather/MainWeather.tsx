import {useEffect} from "react";


export default function MainWeather() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords)
        })
    })



    return (
        <>
            <div>

            </div>
        </>
    )
}