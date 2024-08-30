import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
	out: "src/wagmi.gen.ts",
	contracts: [],
	plugins: [
		foundry({
			project: "../contracts",
		}),
		react(),
	],
});
