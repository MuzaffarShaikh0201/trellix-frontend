import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { showAlert } from "../services/alertService";

import Button from "./Button";
import FormField from "./FormField";
import GoogleLogo from "../assets/google.svg";
import CustomLoader from "./CustomLoader";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirectTo") || "/dashboard";
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		// Basic validation
		if (!email || !password) {
			showAlert(
				"Validation Error",
				"warning",
				"Please fill in all fields"
			);
			return;
		}

		setLoading(true);

		try {
			await login({ email, password });
			navigate(redirectTo, { replace: true });
		} catch (error: any) {
			showAlert(
				"Login Failed",
				"error",
				error.message || "Invalid credentials. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = (e: React.MouseEvent) => {
		e.preventDefault();
		showAlert(
			"Coming Soon!",
			"info",
			"Google login will be available soon!"
		);
	};

	return (
		<div className="bg-background-secondary h-full w-full flex flex-col lg:justify-center justify-between items-center p-4">
			<div className="lg:hidden flex justify-start items-center w-full p-2 gap-2">
				<img src="/layers.svg" alt="Logo" className="w-8 h-8" />
				<h1 className="text-2xl font-bold text-text-primary">
					Trellix
				</h1>
			</div>

			<form
				onSubmit={handleLogin}
				className="w-full h-lvh flex flex-col justify-evenly items-center lg:p-4 p-2"
			>
				<div className="flex flex-col justify-center items-start w-full lg:p-4 p-2 mb-2">
					<h1 className="text-xl font-bold text-text-primary">
						Login
					</h1>
					<p className="text-xs text-text-secondary">
						Welcome back! Please login to your account.
					</p>
				</div>

				<div className="w-full flex flex-col justify-center items-start lg:p-4 p-2 gap-4 mt-4">
					<FormField
						title="Email"
						placeholder="Enter your email..."
						type="email"
						value={email}
						handleChange={(
							e: React.ChangeEvent<HTMLInputElement>
						) => setEmail(e.target.value)}
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

				<div className="w-full flex justify-end items-center lg:p-4 p-2">
					<a
						href="#"
						className="text-xs text-primary hover:underline"
					>
						forgot password?
					</a>
				</div>

				<div className="w-full flex flex-col gap-4 justify-center items-center lg:p-4 p-2">
					<Button
						title={loading ? "" : "Login"}
						fill={true}
						imgSrc={
							loading ? (
								<CustomLoader size={24} color="white" />
							) : undefined
						}
						type="submit"
						disabled={loading}
					/>
					<Button
						title="Login with "
						imgSrc={GoogleLogo}
						fill={false}
						type="button"
						handleClick={handleGoogleLogin}
						disabled={loading}
					/>
				</div>

				<div className="w-full flex justify-center items-center lg:p-4 p-2">
					<p className="text-xs text-text-secondary">
						Don't have an account?{" "}
						<a
							href="/signup"
							className="text-primary hover:underline"
						>
							Sign up
						</a>
					</p>
				</div>
			</form>

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

export default LoginForm;
