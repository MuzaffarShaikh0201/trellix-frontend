import CustomLoader from "../components/CustomLoader";

const Dashboard = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<CustomLoader size={80} />
		</div>
	);
};

export default Dashboard;
