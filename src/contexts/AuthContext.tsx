import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
} from "react";
import { apiService } from "../services/apiService";
import { showAlert } from "../services/alertService";

interface AuthContextType {
	isAuthenticated: boolean;
	user: any;
	login: (credentials: any) => Promise<void>;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Create a separate hook
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};

// Export provider separately
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const initialized = useRef(false);

	const initializeAuth = useCallback(async () => {
		if (initialized.current) return;
		initialized.current = true;

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
