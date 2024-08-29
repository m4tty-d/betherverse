import { Logo } from "@/components/logo";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ConnectKitButton } from "connectkit";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<>
			<div className="border-b">
				<div className="container flex h-16 items-center">
					<Logo className="mr-6" />
					<div className="ml-auto flex items-center space-x-4">
						<ConnectKitButton />
					</div>
				</div>
			</div>
			<div className="container flex-1 pt-6">
				<Outlet />
				<TanStackRouterDevtools />
			</div>
		</>
	);
}

function NotFound() {
	return <div>Not Found</div>;
}
