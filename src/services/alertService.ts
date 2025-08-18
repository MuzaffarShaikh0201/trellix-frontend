type AlertType = "success" | "error" | "warning" | "info";

let alertFunction:
	| ((title: string, type: AlertType, description: string) => void)
	| null = null;

export const setAlertFunction = (
	fn: (title: string, type: AlertType, description: string) => void
) => {
	alertFunction = fn;
};

export const showAlert = (
	title: string,
	type: AlertType,
	description: string
) => {
	if (alertFunction) {
		alertFunction(title, type, description);
	} else {
		console.error("Alert function not set:", title, type, description);
	}
};
