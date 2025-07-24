import { useTheme } from "../contexts/themeContext";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="flex items-center justify-center text-text-primary cursor-pointer"
		>
			{theme === "dark" ? (
				<MdLightMode className="w-5 h-5" />
			) : (
				<MdDarkMode className="w-5 h-5" />
			)}
		</button>
	);
};

export default ThemeToggle;
