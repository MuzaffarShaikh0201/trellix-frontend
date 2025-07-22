import type React from "react";

export type ButtonProps = {
	title: string;
	fill: boolean;
	imgSrc?: string | React.ReactNode;
	handleClick: () => void;
	disabled: boolean;
};

export type FormFieldProps = {
	title: string;
	placeholder: string;
	type: React.HTMLInputTypeAttribute;
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
