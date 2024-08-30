/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "betherverse",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-central-1",
          profile: "m4tty-sandbox",
        },
      },
    };
  },
  async run() {
    const infra = await import("./infra");

    return {
      frontend: infra.frontend.url,
    };
  },
});
