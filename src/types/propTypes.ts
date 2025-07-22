export type ButtonProps = {
	title: string;
	fill: boolean;
	imgSrc?: string;
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
