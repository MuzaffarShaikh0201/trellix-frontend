import { IoMdArrowForward } from "react-icons/io";

import { cn } from "../lib/utils";
import Button from "../components/Button";
import { GridPattern } from "../components/GridPattern";

const Onboarding = () => {
	return (
		<div className="w-full h-full bg-background-primary flex flex-col justify-between items-center">
			<div className="bg-background-primary h-full w-full z-0">
				<GridPattern
					squares={[
						[10, 7],
						[1, 5],
						[3, 2],
						[8, 10],
						[13, 10],
						[15, 13],
						[25, 5],
						[5, 12],
						[22, 10],
						[21, 18],
						[18, 7],
						[24, 1],
						[27, 12],
						[28, 7],
					]}
					className={cn(
						"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
						"inset-x-[-30%] inset-y-[-30%] h-[100%] skew-y-12 hidden md:block"
					)}
				/>
				<div className="flex flex-col justify-center items-center h-full gap-2">
					<div className="flex flex-col md:flex-row justify-center items-center h-full gap-2">
						<img
							src="public/layers.svg"
							alt="Logo"
							className="w-32 h-32 mb-4"
						/>
						<div className="flex flex-col justify-center items-center md:items-start w-full md:w-lg p-4 mb-2">
							<h1 className="text-4xl font-bold text-text-primary text-center md:text-left mb-2 select-none">
								Trellix
							</h1>
							<p className="text-sm text-text-secondary text-wrap text-center md:text-left select-none max-w-xl">
								A modern, React-powered project management app
								inspired by Kanban, built for teams to organize
								tasks, collaborate, and stay productive.
							</p>
						</div>
						<div className="flex flex-col justify-center items-center md:hidden">
							<Button
								title="Get Started"
								imgSrc={<IoMdArrowForward size={20} />}
								fill={true}
								disabled={false}
								handleClick={() => {
									console.log("Get Started Clicked");
								}}
							/>
						</div>
					</div>
					<div className="self-end w-full flex flex-col md:flex-row justify-between items-center gap-2 p-4">
						<p className="text-sm text-text-secondary">
							&copy; Trellix 2025
						</p>
						<a
							href="#"
							className="text-sm text-text-secondary hover:underline"
						>
							Terms of use & Privacy Policy
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
