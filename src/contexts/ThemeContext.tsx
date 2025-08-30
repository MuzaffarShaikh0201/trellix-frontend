import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const getInitialTheme = () => {
		if (typeof window !== "undefined") {
			const storedTheme = window.localStorage.getItem("theme");
			if (storedTheme) {
				return storedTheme;
			}
			if (window.matchMedia) {
				if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
					window.localStorage.setItem("theme", "dark");
					return "dark";
				}
				if (
					window.matchMedia("(prefers-color-scheme: light)").matches
				) {
					window.localStorage.setItem("theme", "light");
					return "light";
				}
			}
		}
		return "light";
	};

	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		setTheme(getInitialTheme);
		document.documentElement.setAttribute("data-theme", theme);
		window.localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

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
