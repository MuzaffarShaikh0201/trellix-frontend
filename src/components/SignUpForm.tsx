import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import Button from "./Button";
import FormField from "./FormField";
import GoogleLogo from "../assets/google.svg";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/apiService";
import { showAlert } from "../services/alertService";

const SignUpForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirectTo") || "/dashboard";
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword
		) {
			showAlert(
				"Validation Error",
				"warning",
				"Please fill in all fields"
			);
			return;
		}

		if (password !== confirmPassword) {
			showAlert("Validation Error", "warning", "Passwords do not match");
			return;
		}

		if (password.length < 8) {
			showAlert(
				"Validation Error",
				"warning",
				"Password must be at least 8 characters long"
			);
			return;
		}

		if (!/[A-Z]/.test(password)) {
			showAlert(
				"Validation Error",
				"warning",
				"Password must contain at least one uppercase letter"
			);
			return;
		}

		if (!/[0-9]/.test(password)) {
			showAlert(
				"Validation Error",
				"warning",
				"Password must contain at least one number"
			);
			return;
		}

		setLoading(true);

		try {
			// Call signup API
			const response = await apiService.request({
				method: "POST",
				url: "/auth/register",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				data: {
					first_name: firstName,
					last_name: lastName,
					email,
					password,
				},
			});

			if (!response.success) {
				throw new Error(response.message || "Signup failed");
			}

			// Auto-login after successful signup
			await login({ email, password });

			showAlert("Success", "success", "Account created successfully!");
			navigate(redirectTo, { replace: true });
		} catch (error: any) {
			showAlert(
				"Signup Failed",
				"error",
				error.message ||
					"An error occurred during signup. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignUp = () => {
		showAlert(
			"Coming Soon1",
			"info",
			"Google signup will be available soon!"
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
				onSubmit={handleSignUp}
				className="w-full h-lvh flex flex-col justify-evenly items-center lg:p-4 p-2"
			>
				<div className="flex flex-col justify-center items-start w-full lg:p-4 p-2 mb-2">
					<h1 className="text-xl font-bold text-text-primary">
						Sign Up
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
						title={loading ? "Creating Account..." : "Sign Up"}
						fill={true}
						type="submit"
						disabled={loading}
					/>

					<Button
						title="Sign Up with "
						imgSrc={GoogleLogo}
						fill={false}
						type="button"
						handleClick={handleGoogleSignUp}
						disabled={loading}
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

export default SignUpForm;
