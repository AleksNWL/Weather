import axios from "axios";

export type KPDataPoint = {
    time_tag: string;
    kp_index: number;
    source: string;
};

export async function getMagneticStorm(): Promise<KPDataPoint[] | null> {
    try {
        const res = await axios.get<KPDataPoint[]>(
            "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json"
        );
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error("Ошибка при загрузке K-index:", error);
        return null;
    }
}
