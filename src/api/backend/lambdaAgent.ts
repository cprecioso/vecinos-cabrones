import Lambda from "aws-sdk/clients/lambda"
import AWS from "aws-sdk/global"

AWS.config.region = "us-east-1"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:f32f8263-a898-4b1a-a6ff-0edb37c15c0e",
})
AWS.config.apiVersion = "2015-03-31"

export const lambdaAgent = new Lambda()
