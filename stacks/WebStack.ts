import { use, StackContext, NextjsSite } from "sst/constructs";
import { Authstack } from "./AuthStack";
export function WebStack({ stack }: StackContext) {

  const auth = use(Authstack);

  // Create the Next.js site
  const site = new NextjsSite(stack, "webapp", {
    path: "web-app/",
    environment: {
      NEXT_PUBLIC_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_USER_POOL_CLIENT_ID: auth.userPoolClientId
    }
  });

  stack.addOutputs({
    URL: site.url || "localhost"
  });
}
