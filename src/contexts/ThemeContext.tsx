import React, { createContext, useState, useEffect } from "react";

type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<string | null>(null); // null = unknown

	useEffect(() => {
		// Only run on client
		const storedTheme = window.localStorage.getItem("theme");
		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.setAttribute("data-theme", storedTheme);
		} else {
			const prefersDark =
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches;
			const initialTheme = prefersDark ? "dark" : "light";
			setTheme(initialTheme);
			document.documentElement.setAttribute("data-theme", initialTheme);
		}
	}, []);

	useEffect(() => {
		if (theme) {
			document.documentElement.setAttribute("data-theme", theme);
			window.localStorage.setItem("theme", theme);
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	// Don’t render children until theme is resolved
	if (theme === null) {
		return null; // or a loader / splash screen
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
