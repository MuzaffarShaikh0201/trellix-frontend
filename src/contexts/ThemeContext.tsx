import React, { createContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState("light");
	const [isMounted, setIsMounted] = useState(false);

	const getInitialTheme = useCallback(() => {
		if (typeof window !== "undefined") {
			const storedTheme = window.localStorage.getItem("theme");
			if (storedTheme) {
				return storedTheme;
			}

			if (
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			) {
				return "dark";
			}
		}
		return "light";
	}, []);

	useEffect(() => {
		const initialTheme = getInitialTheme();
		setTheme(initialTheme);
		document.documentElement.setAttribute("data-theme", initialTheme);
		setIsMounted(true);
	}, [getInitialTheme]);

	useEffect(() => {
		if (!isMounted) return;

		document.documentElement.setAttribute("data-theme", theme);
		window.localStorage.setItem("theme", theme);
	}, [theme, isMounted]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	if (!isMounted) {
		return <div style={{ visibility: "hidden" }}>{children}</div>;
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
