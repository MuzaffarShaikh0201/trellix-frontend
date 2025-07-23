import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const getInitialTheme = () => {
		if (typeof window !== "undefined" && window.matchMedia) {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return "light"; // fallback for SSR or unsupported browsers
	};

	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
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
