import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { setAlertFunction } from "./services/alertService";
import CustomAlert from "./components/CustomAlert";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import AppInfo from "./pages/AppInfo";

function App() {
	const [alert, setAlert] = useState<{
		title: string;
		type: "success" | "error" | "warning" | "info";
		description: string;
	} | null>(null);

	// Global alert setup
	useEffect(() => {
		setAlertFunction((title, type, description) => {
			setAlert({ title, type, description });
		});
	}, []);

	return (
		<BrowserRouter>
			<AuthProvider>
				{/* Global Alert Container - Always rendered */}
				<GlobalAlert alert={alert} setAlert={setAlert} />

				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
}

// Separate component for global alert
const GlobalAlert = ({
	alert,
	setAlert,
}: {
	alert: any;
	setAlert: (alert: any) => void;
}) => {
	if (!alert) return null;

	return (
		<CustomAlert
			type={alert.type}
			title={alert.title}
			description={alert.description}
			onClose={() => setAlert(null)}
		/>
	);
};

// Separate component for routes
const AppRoutes: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Routes>
			<Route path="/login" element={<Auth />} />
			<Route path="/signup" element={<Auth />} />
			<Route path="/info" element={<AppInfo />} />

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>

			{/* Redirects */}
			<Route path="/" element={<Navigate to="/dashboard" replace />} />
			<Route
				path="*"
				element={
					<Navigate
						to={isAuthenticated ? "/dashboard" : "/login"}
						replace
					/>
				}
			/>
		</Routes>
	);
};

export default App;
