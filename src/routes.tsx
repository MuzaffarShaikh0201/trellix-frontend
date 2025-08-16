import { createBrowserRouter, redirect } from "react-router";

import AppInfo from "./pages/AppInfo.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { isAuthenticated } from "./lib/utils.ts";
import AuthLayout from "./layouts/AuthLayout.tsx";
import LoginForm from "./components/LoginForm.tsx";
import SignUpForm from "./components/SignupForm.tsx";

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
			{
				path: "/signup",
				element: <SignUpForm />,
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
