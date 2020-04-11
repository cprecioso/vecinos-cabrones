import { Lambda } from "aws-sdk/clients/all"
import { lambdaAgent } from "./lambdaAgent"
import { SubtitleGetResponse } from "./types"

interface Payload {
  statusCode: number
  result: string
}

export default async function getSubtitle(idStr: string) {
  if (!idStr) throw new Error("No subtitle id given")
  const id = parseInt(idStr, 10)
  if (isNaN(id)) throw new Error("Not a valid subtitle id")

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

  if (innerResponse.statusCode !== 200)
    throw new Error("Unknown status code " + innerResponse.statusCode)

  const results = JSON.parse(innerResponse.result) as SubtitleGetResponse

  return results
}
