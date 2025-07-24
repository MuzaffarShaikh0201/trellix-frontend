import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import type { FormFieldProps } from "../types/propTypes";

const FormField: React.FC<FormFieldProps> = ({
	title,
	placeholder,
	type = "text",
	value,
	handleChange,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div
			className="w-full flex flex-col justify-center items-start gap-2"
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		>
			<label
				htmlFor=""
				className={`text-sm font-light ${
					isFocused ? "text-primary" : "text-text-primary"
				}`}
			>
				{title}
			</label>
			<div
				className={`w-full flex flex-row justify-between items-center p-2 bg-tint rounded-lg border-2 ${
					isFocused ? "border-primary" : "border-tint"
				}`}
			>
				<input
					type={showPassword && type === "password" ? "text" : type}
					className={`${
						type !== "password" ? "w-full" : "w-[90%]"
					} bg-tint text-text-primary border-none outline-none placeholder:text-text-secondary placeholder:text-sm`}
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
					autoComplete="on"
					autoFocus={type === "email"}
				/>
				{type === "password" && (
					<button
						type="button"
						className="text-text-primary cursor-pointer"
						onClick={() => setShowPassword((prev) => !prev)}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					>
						{showPassword ? (
							<IoMdEyeOff size={18} color="#8a909e" />
						) : (
							<IoMdEye size={18} color="#8a909e" />
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default FormField;
