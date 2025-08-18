import React from "react";
import { useLocation } from "react-router";

import Overview from "../components/Overview";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Auth = () => {
	const location = useLocation();

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="hidden lg:flex justify-center items-center h-full w-[70%]">
				<Overview />
			</div>

			<div className="flex justify-center items-center h-full w-full lg:w-[30%]">
				{location.pathname === "/login" && <LoginForm />}
				{location.pathname === "/signup" && <SignUpForm />}
			</div>
		</div>
	);
};

export default Auth;
