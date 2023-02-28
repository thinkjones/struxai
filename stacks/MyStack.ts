import { StackContext, NextjsSite, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
  });

  // Create the Next.js site
  const site = new NextjsSite(stack, "Site", {
    path: "web-app/",
  });

  stack.addOutputs({
    URL: site.url || "localhost",
    ApiEndpoint: api.url,
  });
}
