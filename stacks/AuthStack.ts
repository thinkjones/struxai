import { StackContext, Api } from "sst/constructs";
import { Cognito } from "sst/constructs";

export function AuthStack({ stack }: StackContext) {
  // Create User Pool
  const auth = new Cognito(stack, "auth", {
    login: ["email"],
  });

  // Create Api
  const authApi = new Api(stack, "AuthApi", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
    },
    routes: {
      "GET /private": "packages/functions/src/private.main",
      "GET /public": {
        function: "packages/functions/src/public.main",
        authorizer: "none",
      },
    },
  });

  // allowing authenticated users to access API
  auth.attachPermissionsForAuthUsers(stack, [authApi]);

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    AuthApiEndpoint: authApi.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return {authApi, auth}
}
