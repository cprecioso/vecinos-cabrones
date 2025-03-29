import { lambdaAgent } from "../lambdaAgent";
import { Scene, SceneId } from "../types";

export const NAMESPACE = "scene";

type SubtitleGetResponse = {
  current?: Scene;
  previous?: Scene;
  next?: Scene;
};

interface Payload {
  statusCode: number;
  result: string;
}

const getSubtitle = async (id: number) => {
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

  if (innerResponse.statusCode === 404) {
    return {};
  }

  if (innerResponse.statusCode !== 200)
    throw new Error("Unknown status code " + innerResponse.statusCode);

  const results = JSON.parse(innerResponse.result) as SubtitleGetResponse;

  return results;
};

export type SceneFetchData = Record<SceneId, Scene>;

export const fetchScene = async ([, sceneId]: [
  _: typeof NAMESPACE,
  sceneId: SceneId,
]) => await getSubtitle(sceneId);

export const preloadScene = async (sceneId: SceneId): Promise<Scene[]> => {
  const scenes = await fetchScene([NAMESPACE, sceneId]);
  return [scenes.current, scenes.previous, scenes.next].filter(
    (v: Scene | undefined): v is Scene => v != null,
  );
};
