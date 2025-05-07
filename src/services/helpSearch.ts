import axios from "axios";


export const helpSearch = async (city: string) => {
    if (!city) {
        return;
    }

    const endpoint = "https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=f0d176df9a804658b6a4b18fa3970534";
    const params = {
        text: city,
        apiKey: HELPSEARCH_API_KEY,
        lang: "ru",
        username: "aleksnwl"
    }

    try {
        const { data } = await axios.get(endpoint, { params });
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }
}