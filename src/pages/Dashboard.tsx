import CustomLoader from "../components/CustomLoader";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<CustomLoader size={36} />
			</div>
		);
	}
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			{user.first_name} {user.last_name}
		</div>
	);
};

export default Dashboard;
