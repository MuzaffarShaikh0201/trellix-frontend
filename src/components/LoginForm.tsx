import { useState } from "react";

import Button from "./Button";
import FormField from "./FormField";
import { useNavigate, useSearchParams } from "react-router";

const LoginForm = () => {
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");

	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirectTo") || "/";

	const navigate = useNavigate();

	const handleLogin = () => {
		localStorage.setItem("clientSession", "true");
		navigate(redirectTo, { replace: true });
	};

	return (
		<div className="bg-background-secondary h-full w-full flex flex-col md:justify-center justify-between items-center p-4">
			<div className="md:hidden flex justify-start items-center w-full p-2 gap-2">
				<img src="/layers.svg" alt="Logo" className="w-8 h-8" />
				<h1 className="text-2xl font-bold text-text-primary">
					Trellix
				</h1>
			</div>
			<div className="flex flex-col justify-center items-center w-full md:p-4 p-2">
				<div className="flex flex-col justify-center items-start w-full md:p-4 p-2 mb-2">
					<h1 className="text-3xl font-bold text-text-primary">
						Login
					</h1>
					<p className="text-sm text-text-secondary">
						Welcome back! Please login to your account.
					</p>
				</div>
				<div className="w-full flex flex-col justify-center items-start md:p-4 p-2 gap-4 mt-4">
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
				<div className="w-full flex justify-end items-center md:p-4 p-2">
					<a
						href="#"
						className="text-sm text-primary hover:underline"
					>
						forgot password?
					</a>
				</div>
				<div className="w-full flex flex-col gap-4 justify-center items-center md:p-4 p-2">
					<Button
						title="Login"
						fill={true}
						handleClick={handleLogin}
						disabled={false}
					/>
					<Button
						title="Login with "
						imgSrc="src/assets/google.svg"
						fill={false}
						handleClick={() =>
							console.log("Login with google clicked")
						}
						disabled={false}
					/>
				</div>
				<div className="w-full flex justify-center items-center md:p-4 p-2">
					<p className="text-sm text-text-secondary">
						Don't have an account?{" "}
						<a
							href="/signup"
							className="text-primary hover:underline"
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
			<div className="self-end w-full md:hidden flex flex-col justify-center items-center p-2">
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
	);
};

export default LoginForm;
