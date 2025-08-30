import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";
import { apiService } from "../services/apiService";
import { showAlert } from "../services/alertService";

interface AuthContextType {
	isAuthenticated: boolean;
	user: any;
	login: (credentials: any) => Promise<boolean>;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Create a hook for accessing the context
const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};

// Main provider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const initializeAuth = useCallback(async () => {
		const userData = localStorage.getItem("userData");
		if (userData) setUser(JSON.parse(userData));

		try {
			const isAuth = await apiService.initializeAuth();
			setIsAuthenticated(isAuth);

			if (isAuth && !userData) {
				const storedUser = localStorage.getItem("userData");
				if (storedUser) setUser(JSON.parse(storedUser));
			}
			return true;
		} catch (error) {
			setIsAuthenticated(false);
			showAlert("Session Expired", "error", "Please log in again");
			return false;
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	const login = async (credentials: any) => {
		setLoading(true);
		try {
			const { user } = await apiService.login(credentials);
			setIsAuthenticated(true);
			setUser(user);

			// Show login success alert
			showAlert(
				"Login Successful",
				"success",
				"You have been logged in successfully"
			);

			return true;
		} catch (error) {
			setIsAuthenticated(false);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		apiService.logout();
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user, login, logout, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Named exports only
export { AuthProvider, useAuthContext as useAuth };
