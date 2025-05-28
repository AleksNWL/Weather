import { Box, Typography, Skeleton } from "@mui/material";
import { useCoordsCity } from "../../context/CoordsCityContext.tsx";
import { useEffect, useState } from "react";
import { getAirData } from "../../services/getAir.ts";

export default function UVIndex() {
    const { coordinate } = useCoordsCity();
    const [uv, setUV] = useState<number | null>(null);

    useEffect(() => {
        const fetchUV = async () => {
            if (coordinate) {
                const data = await getAirData(coordinate);
                setUV(data.uv);
            }
        };
        fetchUV();
    }, [coordinate]);

    const getUVColor = (uv: number): string => {
        if (uv <= 2) return "#00e400";
        if (uv > 2 && uv <= 5) return "#fdd64b";
        if (uv > 5 && uv <= 7) return "#ff9b57";
        if (uv > 7 && uv <= 19) return "#fe6a69";
        return "#a97abc";
    };

    const getUVText = (uv: number): string => {
        if (uv <= 2) return "Защита не требуется";
        if (uv > 2 && uv <= 5) return "Рекомендуется защита";
        if (uv > 5 && uv <= 7) return "Используйте защиту";
        if (uv > 7 && uv <= 19) return "Ограничьте пребывание на солнце";
        return "Лучше оставайтесь в помещении";
    };

    if (uv === null) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center">
                <Skeleton variant="circular" width={100} height={100} />
                <Skeleton variant="text" width={60} height={30} />
                <Skeleton variant="text" width={200} height={24} sx={{ mt: 1 }} />
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box position="relative" display="flex" justifyContent="center" alignItems="center">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M50 83.3333C31.5905 83.3333 16.6667 68.4096 16.6667 50C16.6667 31.5905 31.5905 16.6667 50 16.6667C68.4096 16.6667 83.3333 31.5905 83.3333 50C83.3333 68.4096 68.4096 83.3333 50 83.3333ZM..."
                        fill={getUVColor(uv)}
                    />
                </svg>
                <Typography
                    variant="h6"
                    sx={{
                        position: "absolute",
                        color: "white",
                        textShadow: "0 0 5px rgba(0,0,0,0.5)"
                    }}
                >
                    {uv}
                </Typography>
            </Box>
            <Typography
                variant="body1"
                fontWeight={600}
                mt={1}
            >
                {getUVText(uv)}
            </Typography>
        </Box>
    );
}
