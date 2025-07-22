import React from "react";
import type { ButtonProps } from "../types/propTypes";

const Button: React.FC<ButtonProps> = ({
	title,
	fill = true,
	imgSrc = undefined,
	handleClick,
	disabled = false,
}) => {
	return (
		<button
			className={`w-full ${fill ? "bg-primary" : "bg-transparent"} ${
				fill ? "text-white" : "text-text-primary"
			} p-2 rounded-md border-2 border-primary font-bold cursor-pointer ${
				fill ? "active:bg-blue-600" : "active:bg-primary"
			} transition-colors`}
			onClick={handleClick}
			disabled={disabled}
		>
			<div className="flex items-center justify-center gap-2">
				<span>{title}</span>
				{imgSrc && <img src={imgSrc} alt={title} className="h-6" />}
			</div>
		</button>
	);
};

export default Button;
