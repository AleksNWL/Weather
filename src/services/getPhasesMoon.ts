export const getMoonPhases = async () => {
    try {
        // Текущая дата в UNIX timestamp (секунды)
        const now = Math.floor(Date.now() / 1000);
        const res = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${now}`);
        const data = await res.json();

        if (data && data.length > 0) {
            // Возвращаем фазу как строку, например "Full Moon"
            return { phase: data[0].Phase };
        }
        return null;
    } catch (error) {
        console.error("Ошибка при получении фазы Луны:", error);
        return null;
    }
};
