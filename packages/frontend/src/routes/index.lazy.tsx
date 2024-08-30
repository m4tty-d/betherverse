import { Counter } from "@/components/Counter";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div>
			<div className="mb-4">
				<div>Contract Address:</div>
				<div>{import.meta.env.VITE_CONTRACT_ADDRESS}</div>
			</div>
			<Counter />
		</div>
	);
}
