import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { history } from "../services/history";

const ProtectedRoute: React.FC = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		history.replace("/login", { from: history.location });
		return null;
	}

	return <Outlet />;
};

export default ProtectedRoute;
