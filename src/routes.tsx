import { createBrowserRouter, redirect } from "react-router";

import AppInfo from "./pages/AppInfo.tsx";
import Dashboard from "./pages/dashboard.tsx";
import { isAuthenticated } from "./lib/utils.ts";
import AuthLayout from "./layouts/AuthLayout.tsx";
import LoginForm from "./components/LoginForm.tsx";

const authenticatedLoader = ({ request }: { request: Request }) => {
	if (!isAuthenticated()) {
		const url = new URL(request.url);
		return redirect(
			`/login?redirectTo=${encodeURIComponent(url.pathname)}`
		);
	}

	return null;
};

const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <LoginForm />,
			},
		],
	},
	{
		path: "/info",
		element: <AppInfo />,
	},
	{
		path: "/",
		children: [
			{
				path: "/",
				element: <Dashboard />,
				loader: authenticatedLoader,
			},
		],
	},
]);

export default router;
