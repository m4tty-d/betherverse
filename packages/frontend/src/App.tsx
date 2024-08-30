import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { Web3Provider } from "./components/Web3Provider";
import { router } from "./services/router";

export const App = () => {
	return (
		<Web3Provider>
			<RouterProvider router={router} />
		</Web3Provider>
	);
};
