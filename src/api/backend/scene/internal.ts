import type { Lambda } from "aws-sdk/clients/all"
import { mutate } from "../../data-fetch"
import { lambdaAgent } from "../lambdaAgent"
import { Scene } from "../types"

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

export const getSubtitle = async (_id: string) => {
  const id = Number.parseInt(_id)

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

export const saveScene = (scene: Scene) =>
  mutate(NAMESPACE, "" + scene.id, scene)
