import { Outlet } from "react-router";

import Overview from "../components/Overview";

const AuthLayout = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="hidden md:flex justify-center items-center h-full w-[70%]">
				<Overview />
			</div>
			<div className="flex justify-center items-center h-full w-full md:w-[30%]">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
