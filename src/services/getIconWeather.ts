
export default function getIconWeather(weathercode: number): string {
    const weatherMap: {[weathercode: number]: string} = {
        0: "sun",
        1: "mainly_clear", 2: "partly_cloudy", 3: "overcast",
        45: "fog", 48: "fog",
        51: "drizzle_light", 53: "drizzle_moderate", 55: "drizzle_dense_intensity",
        56: "freezing_drizzle", 57: "freezing_drizzle",
        61: "rain_slight", 63: "rain_moderate", 65: "rain_heavy_intensity",
        66: "freezing_rain", 67: "freezing_rain",
        71: "snow_fall_slight", 73: "snow_fall_moderate", 75: "snow_fall_heavy_intensity",
        77: "snow_fall_moderate",
        80: "rain_slight", 81: "rain_moderate", 82: "rain_heavy_intensity",
        85: "snow_fall_moderate", 86: "snow_fall_heavy_intensity",
        95: "thunderstorm",
        96: "thunderstorm_hail", 99: "thunderstorm_hail"
    }

    const iconName = weatherMap[weathercode] || "celsius"

    return `.../../../public/img/weatherIcons/${iconName}.svg`;
}