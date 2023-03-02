import { Bucket, StackContext, NextjsSite, Api, use } from "sst/constructs";
import { AuthStack } from "./AuthStack";

export function ApiStack({ stack }: StackContext) {
  
  const authStack = use(AuthStack);
  
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
  });

  // Create a new bucket
  const bucket = new Bucket(stack, "Bucket", {
    cors: [
      {
        allowedHeaders: ["*"],
        allowedMethods: ["PUT", "POST", "GET", "HEAD", "OPTIONS"],
        allowedOrigins: ["*"],
      }
    ],
  });

  authStack.auth.attachPermissionsForAuthUsers(stack, [bucket]);

  // Show the endpoint in the output
  stack.addOutputs({
    BucketName: bucket.bucketName,
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { bucket }
}
