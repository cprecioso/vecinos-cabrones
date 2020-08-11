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

export const fetchScene = async (_: typeof NAMESPACE, sceneId: SceneId) =>
  await getSubtitle(sceneId)

export const preloadScene = async (sceneId: SceneId): Promise<Scene[]> => {
  const scenes = await fetchScene(NAMESPACE, sceneId)
  return [scenes.current, scenes.previous, scenes.next].filter(
    (v: Scene | undefined): v is Scene => v != null
  )
}
