export const frontend = new sst.aws.StaticSite("frontend", {
	path: "packages/frontend",
	build: {
		command: "pnpm run build",
		output: "dist",
	},
	environment: {
		VITE_WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
	},
});
