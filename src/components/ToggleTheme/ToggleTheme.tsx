import useTheme from "../../hooks/useTheme.tsx";
import LightImg from "/tools/light.svg";
import DarkImg from "/tools/dark.svg";


export default function ToggleTheme() {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <>
            {theme === "light" ? (<img src={DarkImg} alt={theme} onClick={() => toggleTheme()} />) : (<img src={LightImg} alt={theme} onClick={() => toggleTheme()} />) }
        </>
    )
}