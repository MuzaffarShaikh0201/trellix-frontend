import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

type AlertType = "success" | "error" | "warning" | "info";

interface CustomAlertProps {
	type: AlertType;
	title: string;
	description: string;
	onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
	type,
	title,
	description,
	onClose,
}) => {
	const [progress, setProgress] = useState(100);
	const [isOpen, setIsOpen] = useState(true);

	// Auto-close + progress bar logic
	useEffect(() => {
		if (!isOpen) return;

		const totalDuration = 10000; // 10s
		const interval = 100;
		let elapsed = 0;

		const timer = setInterval(() => {
			elapsed += interval;
			const percent = 100 - (elapsed / totalDuration) * 100;
			setProgress(percent);

			if (elapsed >= totalDuration) {
				clearInterval(timer);
				handleClose();
			}
		}, interval);

		return () => clearInterval(timer);
	}, [isOpen]);

	const handleClose = () => {
		setIsOpen(false);
		setTimeout(() => {
			if (typeof onClose === "function") {
				onClose();
			}
		}, 500); // Wait for animation to finish
	};

	const bgColor =
		type === "warning"
			? "bg-yellow-500"
			: type === "error"
			? "bg-red-500"
			: type === "success"
			? "bg-green-600"
			: "bg-blue-500";

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ x: 300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 600, opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={`fixed bottom-6 right-6 w-4/5 max-w-sm rounded-lg shadow-lg text-white overflow-hidden ${bgColor}`}
				>
					{/* Header */}
					<div className="flex justify-center items-center px-6 pt-4 relative">
						<h3 className="font-medium text-sm">{title}</h3>
						<button
							onClick={handleClose}
							className="absolute top-2 right-2 p-1 cursor-pointer"
						>
							<MdClose width={5} height={5} />
						</button>
					</div>

					{/* Description */}
					<div className="flex justify-center items-center px-4 pb-4">
						{Array.isArray(description) ? (
							<ul className="text-xs">
								{description.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						) : (
							<p className="text-xs">{description}</p>
						)}
					</div>

					{/* Progress Bar */}
					<div className="w-full h-1 bg-white/40">
						<motion.div
							className="h-1 bg-white"
							initial={{ width: "100%" }}
							animate={{ width: `${progress}%` }}
							transition={{ ease: "linear" }}
						/>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CustomAlert;
