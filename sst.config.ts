import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { WebStack } from "./stacks/WebStack";

export default {
  config(_input) {
    return {
      name: "my-sst-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(AuthStack).stack(ApiStack).stack(WebStack);
  },
} satisfies SSTConfig;