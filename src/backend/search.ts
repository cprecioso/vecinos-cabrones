import Lambda from "aws-sdk/clients/lambda"
import { lambdaAgent } from "./lambdaAgent"
import { SubtitleSearchResponse } from "./types"

interface Payload {
  statusCode: number
  results: string
}

export default async function searchSubtitle(search: string) {
  if (!search) throw new Error("No query given")

  const response = await new Promise<Lambda.InvocationResponse>(
    (fulfill, reject) => {
      lambdaAgent.invoke(
        {
          FunctionName: "anhqv-search-production-searchSubtitles",
          InvocationType: "RequestResponse",
          LogType: "None",
          Payload: JSON.stringify({ search }),
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

  const results = JSON.parse(innerResponse.results) as SubtitleSearchResponse

  return results
}
