import { use, StackContext, NextjsSite } from "sst/constructs";
import { AuthStack } from "./AuthStack";

export function WebStack({ stack, app }: StackContext) {

  const authStack = use(AuthStack);

  // Create the Next.js site
  const site = new NextjsSite(stack, "webapp", {
    path: "web-app/",
    environment: {
      NEXT_PUBLIC_USER_POOL_ID: authStack.auth.userPoolId,
      NEXT_PUBLIC_USER_POOL_CLIENT_ID: authStack.auth.userPoolClientId,
      NEXT_PUBLIC_AUTH_API_URL: authStack.authApi.url,
      NEXT_PUBLIC_REGION: app.region,

    }
  });

  stack.addOutputs({
    URL: site.url || "localhost"
  });
}
