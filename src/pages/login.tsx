import React, { useState } from "react";

import { cn } from "../lib/utils";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { AnimatedGridPattern } from "../components/AnimatedGridPattern";

const Login = () => {
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="bg-background-primary h-full w-[70%] z-0 hidden md:block overflow-hidden">
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.3}
					duration={3}
					repeatDelay={1}
					className={cn(
						"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
						"inset-x-[-30%] inset-y-[-25%] h-[100%] skew-y-12"
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
							<p className="text-sm text-text-secondary text-wrap select-none">
								A modern, React-powered project management app
								inspired by Kanban, built for teams to organize
								tasks, collaborate, and stay productive.
							</p>
						</div>
					</div>
					<div className="self-end w-full flex justify-between items-center gap-4 p-4">
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
			<div className="bg-background-secondary h-full w-full md:w-[30%] flex justify-center items-center p-4">
				<div className="flex flex-col justify-center items-center w-full p-4">
					<div className="flex flex-col justify-center items-start w-full p-4 mb-2">
						<h1 className="text-3xl font-bold text-text-primary">
							Login
						</h1>
						<p className="text-sm text-text-secondary">
							Welcome back! Please login to your account.
						</p>
					</div>
					<div className="w-full flex flex-col justify-center items-start p-4 gap-4 mt-4">
						<FormField
							title="Email"
							placeholder="Enter your email..."
							type="email"
							value={email}
							handleChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setemail(e.target.value)}
						/>
						<FormField
							title="Password"
							placeholder="Enter your password..."
							type="password"
							value={password}
							handleChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setPassword(e.target.value)}
						/>
					</div>
					<div className="w-full flex justify-end items-center p-4">
						<a
							href="#"
							className="text-sm text-primary hover:underline"
						>
							forgot password?
						</a>
					</div>
					<div className="w-full flex flex-col gap-4 justify-center items-center p-4">
						<Button
							title="Login"
							fill={true}
							handleClick={() => console.log("Login clicked")}
							disabled={false}
						/>
						<Button
							title="Login with "
							imgSrc="src/assets/google.svg"
							fill={false}
							handleClick={() => console.log("Login clicked")}
							disabled={false}
						/>
					</div>
					<div className="w-full flex justify-center items-center p-4">
						<p className="text-sm text-text-secondary">
							Don't have an account?{" "}
							<a
								href="#"
								className="text-primary hover:underline"
							>
								Sign up
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
