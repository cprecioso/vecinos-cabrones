import { Lambda } from "@aws-sdk/client-lambda";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export const lambdaAgent = new Lambda({
  region: "us-east-1",
  credentials: fromCognitoIdentityPool({
    identityPoolId: "us-east-1:f32f8263-a898-4b1a-a6ff-0edb37c15c0e",
  }),
});
