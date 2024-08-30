import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiProvider, createConfig } from "wagmi";
import { foundry, localhost } from "wagmi/chains";

const config = createConfig(
	getDefaultConfig({
		appName: "betherverse",
		walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
		chains: [localhost, foundry],
	}),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider debugMode>{children}</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};
