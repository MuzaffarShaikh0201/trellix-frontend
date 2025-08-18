import { cn } from "../lib/utils";
import { AnimatedGridPattern } from "./AnimatedGridPattern";

const Overview = () => {
	return (
		<div className="bg-background-primary h-full w-full overflow-hidden relative">
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.3}
				duration={3}
				repeatDelay={1}
				className={cn(
					"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
					"inset-x-[0%] inset-y-[0%] h-[100%]"
				)}
			/>
			<div className="flex flex-col justify-center items-center h-full gap-2">
				<div className="flex justify-center items-center h-full gap-2">
					<img
						src="/layers.svg"
						alt="Logo"
						className="w-32 h-32 mb-4"
					/>
					<div className="flex flex-col justify-center items-start w-lg p-4 mb-2">
						<h1 className="text-4xl font-bold text-text-primary mb-2 select-none">
							Trellix
						</h1>
						{/* <p className="text-sm text-text-secondary text-wrap select-none">
							A modern, React-powered project management app
							inspired by Kanban, built for teams to organize
							tasks, collaborate, and stay productive.
						</p> */}
						<p className="text-sm text-text-secondary text-wrap select-none">
							A modern, React-powered project management app
							inspired by Kanban, built to organize tasks and stay
							productive.
						</p>
					</div>
				</div>
				<div className="self-end w-full flex justify-between items-center gap-4 p-4">
					<p className="text-sm text-text-secondary">
						&copy; Trellix 2025
					</p>
					<a
						href="/info#terms-of-use"
						className="text-sm text-text-secondary hover:underline"
					>
						Terms of use & Privacy Policy
					</a>
				</div>
			</div>
		</div>
	);
};

export default Overview;
