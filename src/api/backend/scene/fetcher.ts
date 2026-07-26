import { cache } from "react";
import { lambdaAgent } from "../lambdaAgent";
import { Scene } from "../types";

export type SubtitleGetResponse = {
  current: Scene;
  previous?: Scene;
  next?: Scene;
};

interface Payload {
  statusCode: number;
  result: string;
}

export const getSubtitle = cache(async (id: number) => {
  const response = await lambdaAgent.invoke({
    FunctionName: "anhqv-search-production-getSubtitle",
    InvocationType: "RequestResponse",
    LogType: "None",
    Payload: JSON.stringify({ id }),
  });

  if (response.StatusCode !== 200)
    throw new Error("Unknown status code " + response.StatusCode);
  const innerResponse = JSON.parse(
    new TextDecoder("utf-8").decode(response.Payload),
  ) as Payload;

  if (innerResponse.statusCode !== 200)
    throw new Error("Unknown status code " + innerResponse.statusCode);

  const results = JSON.parse(innerResponse.result) as SubtitleGetResponse;

  return results;
});
