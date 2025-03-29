import useSWR from "swr";
import { lambdaAgent } from "./lambdaAgent";
import { Scene } from "./types";

const NAMESPACE = "search";

type SubtitleSearchResponse = Scene[];

interface Payload {
  statusCode: number;
  results: string;
}

const searchSubtitle = async (search: string) => {
  const response = await lambdaAgent.invoke({
    FunctionName: "anhqv-search-production-searchSubtitles",
    InvocationType: "RequestResponse",
    LogType: "None",
    Payload: JSON.stringify({ search }),
  });

  if (response.StatusCode !== 200)
    throw new Error("Unknown status code " + response.StatusCode);
  const innerResponse = JSON.parse(
    new TextDecoder("utf-8").decode(response.Payload),
  ) as Payload;
  if (innerResponse.statusCode !== 200)
    throw new Error("Unknown status code " + innerResponse.statusCode);

  const results = JSON.parse(innerResponse.results) as SubtitleSearchResponse;

  return results;
};

const searchSceneFetcher = async ([, query]: [
  _: typeof NAMESPACE,
  query: string,
]) => searchSubtitle(query);

const useSearchScene = (query?: string, initialData?: Scene[]) =>
  useSWR(query ? [NAMESPACE, query] : null, searchSceneFetcher, {
    fallbackData: initialData,
    refreshInterval: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

export default useSearchScene;
