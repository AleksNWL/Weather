


export default function Search() {
    const getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords)
        })
    }

    return (
        <>
            <button onClick={getGeolocation}>Получить местоположение</button>
        </>
    )
}