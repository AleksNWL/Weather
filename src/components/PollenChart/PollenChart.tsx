import { usePollen } from "../../context/PollenContext.tsx";
import { useState, useMemo } from "react";
import "./PollenChart.scss";
import Alder from "../../../public/img/tools/alder.svg";
import Birch from "../../../public/img/tools/birch.svg";
import Grass from "../../../public/img/tools/grass.svg";
import Mugwort from "../../../public/img/tools/mugwort.svg";
import {useCoordsCity} from "../../context/CoordsCityContext.tsx";
import declineNameCity from "../../services/declineNameCity.ts";


type NormalizedPollenKey = "birchPollen" | "alderPollen" | "grassPollen" | "mugwortPollen";

interface GroupedEntry {
    time: string;
    birchPollen: number;
    alderPollen: number;
    grassPollen: number;
    mugwortPollen: number;
}

type PollenGroupedData = Record<string, GroupedEntry[]>;
type PollenAverages = Record<NormalizedPollenKey, Record<string, number>>;

interface ChartEntry {
    label: string;
    value: number;
}

const POLLEN_MAX: Record<NormalizedPollenKey, number> = {
    birchPollen: 1500,
    alderPollen: 1500,
    grassPollen: 200,
    mugwortPollen: 500
};

const getPollenLevel = (value: number, max: number): number => {
    const percent = (value * 100) / max;
    if (percent === 0) return 0;
    if (percent <= 10) return 3;
    if (percent <= 20) return 6;
    return 10;
};

const getColor = (level: number): string => {
    if (level <= 3) return "#9EFF36";
    if (level <= 6) return "#FFDA36";
    return "#FF6C36";
};

export function PollenChart() {
    const { pollen } = usePollen();
    const [choice, setChoice] = useState<NormalizedPollenKey>("birchPollen");
    const { city } = useCoordsCity();

    const groupedData = useMemo<PollenGroupedData | null>(() => {
        if (!pollen) return null;
        const result: PollenGroupedData = {};

        pollen.time.forEach((time, i) => {
            const day = time.split("T")[0];
            if (!result[day]) result[day] = [];

            result[day].push({
                time,
                birchPollen: pollen.birch_pollen[i],
                alderPollen: pollen.alder_pollen[i],
                grassPollen: pollen.grass_pollen[i],
                mugwortPollen: pollen.mugwort_pollen[i]
            });
        });

        return result;
    }, [pollen]);

    const averages = useMemo<PollenAverages | null>(() => {
        if (!groupedData) return null;

        const avg: PollenAverages = {
            birchPollen: {},
            alderPollen: {},
            grassPollen: {},
            mugwortPollen: {}
        };

        for (const [day, entries] of Object.entries(groupedData)) {
            const sums = {
                birchPollen: 0,
                alderPollen: 0,
                grassPollen: 0,
                mugwortPollen: 0
            };

            entries.forEach((entry) => {
                sums.birchPollen += entry.birchPollen;
                sums.alderPollen += entry.alderPollen;
                sums.grassPollen += entry.grassPollen;
                sums.mugwortPollen += entry.mugwortPollen;
            });

            const count = entries.length;
            (Object.keys(sums) as NormalizedPollenKey[]).forEach((key) => {
                avg[key][day] = Math.round(sums[key] / count);
            });
        }

        return avg;
    }, [groupedData]);

    if (!pollen || !groupedData || !averages) return <div>Loading...</div>;

    const today = Object.keys(groupedData)[0];

    const todayLevels: Record<NormalizedPollenKey, number> = {
        birchPollen: getPollenLevel(averages.birchPollen[today], POLLEN_MAX.birchPollen),
        alderPollen: getPollenLevel(averages.alderPollen[today], POLLEN_MAX.alderPollen),
        grassPollen: getPollenLevel(averages.grassPollen[today], POLLEN_MAX.grassPollen),
        mugwortPollen: getPollenLevel(averages.mugwortPollen[today], POLLEN_MAX.mugwortPollen)
    };

    const chartValues: ChartEntry[] = Object.entries(averages[choice]).map(([day, value]) => ({
        label: new Date(day).toLocaleDateString([], { weekday: "short" }).toUpperCase(),
        value: getPollenLevel(value, POLLEN_MAX[choice])
    }));

    const pollenOptions: { key: NormalizedPollenKey; label: string, img: string }[] = [
        { key: "birchPollen", label: "Береза", img: Birch },
        { key: "alderPollen", label: "Ольха", img: Alder },
        { key: "grassPollen", label: "Злаки", img: Grass },
        { key: "mugwortPollen", label: "Полынь", img: Mugwort },
    ];

    const selectedPollen = pollenOptions.find(t => t.key === choice);

    return (
        <div>
            <h2 style={{fontSize:"1.2rem"}}>Активность пыльцы в {declineNameCity(city)}</h2>
            <div className="pollen-container-chart">
                <div className="pollen-mini-container">
                    <p>Сегодня</p>
                    <div className="pollen-choices">
                        {pollenOptions.map(({ key, label, img }) => (
                            <div key={key} className="pollen-choice" onClick={() => setChoice(key)}>
                                <p>{label}</p>
                                <div className="container-choice">
                                    <img src={img} alt={label} />
                                    <div className="pollen-level">
                                        <div className={`high ${todayLevels[key] > 6 ? "red" : ""}`} />
                                        <div className={`middle ${todayLevels[key] > 3 ? "yellow" : ""}`} />
                                        <div className={`low ${todayLevels[key] > 0 ? "green" : ""}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bar-background">
                    <p>{selectedPollen?.label}</p>
                    <div className="custom-bar-chart">
                        {chartValues.map((entry, i) => (
                            <div className="bar-wrapper" key={i}>
                                <div
                                    className="bar"
                                    style={{
                                        height: `${entry.value === 0 ? 0 : 8 * entry.value}px`,
                                        width: "20px",
                                        backgroundColor: getColor(entry.value)
                                    }}
                                />
                                <span className="bar-label">{entry.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="ok"></div>
                </div>
            </div>
        </div>
    );
}
