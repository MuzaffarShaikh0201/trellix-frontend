import React from "react";

export type ButtonProps = {
	title: string;
	fill: boolean;
	type: "button" | "submit" | "reset";
	imgSrc?: string | React.ReactNode;
	handleClick?: (e: React.MouseEvent) => void;
	disabled: boolean;
};

const Button: React.FC<ButtonProps> = ({
	title,
	fill = true,
	type = "button",
	imgSrc = undefined,
	handleClick,
	disabled = false,
}) => {
	return (
		<button
			className={`w-full ${fill ? "bg-primary" : "bg-transparent"} ${
				fill ? "text-white" : "text-text-primary"
			} p-2 rounded-md border-2 border-primary text-sm font-bold cursor-pointer ${
				fill ? "active:bg-blue-600" : "active:bg-primary"
			} transition-colors`}
			onClick={handleClick}
			disabled={disabled}
			type={type}
		>
			<div className="flex items-center justify-center gap-2">
				<span>{title}</span>
				{typeof imgSrc === "string" ? (
					<img src={imgSrc} alt={title} className="h-4" />
				) : typeof imgSrc === "object" ? (
					imgSrc
				) : null}
			</div>
		</button>
	);
};

export default Button;
