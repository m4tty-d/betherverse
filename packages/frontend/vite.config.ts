import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite(), react(), biomePlugin()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
