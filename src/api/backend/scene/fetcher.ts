import type { Lambda } from "aws-sdk/clients/all"
import { lambdaAgent } from "../lambdaAgent"
import { Scene, SceneId } from "../types"

export const NAMESPACE = "scene"

type SubtitleGetResponse = {
  current?: Scene
  previous?: Scene
  next?: Scene
}

interface Payload {
  statusCode: number
  result: string
}

const getSubtitle = async (id: number) => {
  const response = await new Promise<Lambda.InvocationResponse>(
    (fulfill, reject) => {
      lambdaAgent.invoke(
        {
          FunctionName: "anhqv-search-production-getSubtitle",
          InvocationType: "RequestResponse",
          LogType: "None",
          Payload: JSON.stringify({ id }),
        },
        (err, data) => (err ? reject(err) : fulfill(data))
      )
    }
  )

  if (response.StatusCode !== 200)
    throw new Error("Unknown status code " + response.StatusCode)
  const innerResponse = JSON.parse(response.Payload as string) as Payload

  if (innerResponse.statusCode === 404) {
    return {}
  }

  if (innerResponse.statusCode !== 200)
    throw new Error("Unknown status code " + innerResponse.statusCode)

  const results = JSON.parse(innerResponse.result) as SubtitleGetResponse

  return results
}

export type SceneFetchData = Record<SceneId, Scene>

export const fetchScene = async (
  _: typeof NAMESPACE,
  sceneId: SceneId,
  preloadedData?: SceneFetchData
): Promise<SceneFetchData> => {
  if (preloadedData && preloadedData[sceneId]) return preloadedData

  const res = await getSubtitle(sceneId)

  return {
    ...preloadedData,
    ...(res.current?.id ? { [res.current.id]: res.current } : undefined),
    ...(res.previous?.id ? { [res.previous.id]: res.previous } : undefined),
    ...(res.next?.id ? { [res.next.id]: res.next } : undefined),
  }
}

export const preloadScene = async (sceneId: SceneId) =>
  fetchScene(NAMESPACE, sceneId)
