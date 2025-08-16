import { useNavigate } from "react-router";

import ThemeToggle from "./ThemeToggle";

const MinNavbar = () => {
	const navigate = useNavigate();

	return (
		<nav className="w-full p-4 sticky top-0 z-10 bg-background-primary flex justify-between items-center">
			<div className="flex justify-between items-center gap-2 px-0 lg:px-4">
				<img src="/layers.svg" alt="logo" className="w-8 h-8" />
				<div
					onClick={() => navigate("/", { replace: true })}
					className="cursor-pointer"
				>
					<h1 className="text-xl font-bold text-text-primary">
						Trellix
					</h1>
				</div>
			</div>
			<div className="flex justify-between items-center px-0 lg:px-4">
				<ThemeToggle />
			</div>
		</nav>
	);
};

export default MinNavbar;
