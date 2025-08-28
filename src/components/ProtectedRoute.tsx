import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { history } from "../services/history";
import CustomLoader from "./CustomLoader";

const ProtectedRoute: React.FC = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="w-screen h-screen bg-background-primary">
				<CustomLoader />
			</div>
		);
	}

	if (!isAuthenticated) {
		history.replace("/login", { from: history.location });
		Navigate({ to: "/login" });
		return null;
	}

	return <Outlet />;
};

export default ProtectedRoute;
