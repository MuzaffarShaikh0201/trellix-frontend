import { useState } from "react";

import Button from "./Button";
import FormField from "./FormField";
import GoogleLogo from "../assets/google.svg";
import { useNavigate, useSearchParams } from "react-router";

const SignUpForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirectTo") || "/";

	const navigate = useNavigate();

	const handleLogin = () => {
		localStorage.setItem("clientSession", "true");
		navigate(redirectTo, { replace: true });
	};

	return (
		<div className="bg-background-secondary h-full w-full flex flex-col lg:justify-center justify-between items-center p-4">
			<div className="lg:hidden flex justify-start items-center w-full p-2 gap-2">
				<img src="/layers.svg" alt="Logo" className="w-8 h-8" />
				<h1 className="text-2xl font-bold text-text-primary">
					Trellix
				</h1>
			</div>
			<div className="w-full h-lvh flex flex-col justify-evenly items-center lg:p-4 p-2">
				<div className="flex flex-col justify-center items-start w-full lg:p-4 p-2 mb-2">
					<h1 className="text-xl font-bold text-text-primary">
						SignUp
					</h1>
					<p className="text-xs text-text-secondary">
						Welcome! Please create your account to get started.
					</p>
				</div>
				<div className="w-full flex flex-col justify-center items-start lg:p-4 p-2 gap-4 mt-2">
					<div className="w-full flex justify-center items-center gap-4">
						<FormField
							title="First Name"
							placeholder="Enter your first name..."
							type="text"
							value={firstName}
							handleChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setFirstName(e.target.value)}
						/>
						<FormField
							title="Last Name"
							placeholder="Enter your last name..."
							type="text"
							value={lastName}
							handleChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setLastName(e.target.value)}
						/>
					</div>
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
					<FormField
						title="Confirm Password"
						placeholder="Confirm your password..."
						type="password"
						value={confirmPassword}
						handleChange={(
							e: React.ChangeEvent<HTMLInputElement>
						) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="w-full flex flex-col gap-4 justify-center items-center lg:p-4 p-2">
					<Button
						title="Sign Up"
						fill={true}
						handleClick={handleLogin}
						disabled={false}
					/>
					<Button
						title="Sign Up with "
						imgSrc={GoogleLogo}
						fill={false}
						handleClick={() =>
							console.log("Login with google clicked")
						}
						disabled={false}
					/>
				</div>
				<div className="w-full flex justify-center items-center lg:p-4 p-2">
					<p className="text-xs text-text-secondary">
						Already have an account?{" "}
						<a
							href="/login"
							className="text-primary hover:underline"
						>
							Login
						</a>
					</p>
				</div>
			</div>
			<div className="self-end w-full p-2 lg:hidden flex flex-col justify-center items-center gap-2">
				<p className="text-xs text-text-secondary">
					&copy; Trellix 2025
				</p>
				<a
					href="/info#terms-of-use"
					className="text-xs text-text-secondary hover:underline"
				>
					Terms of use & Privacy Policy
				</a>
			</div>
		</div>
	);
};

export default SignUpForm;
