import type { Lambda } from "aws-sdk/clients/all"
import useSWR from "swr"
import { lambdaAgent } from "./lambdaAgent"
import { Scene } from "./types"

const NAMESPACE = "search"

type SubtitleSearchResponse = Scene[]

interface Payload {
  statusCode: number
  results: string
}

const searchSubtitle = async (search: string) => {
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

const searchSceneFetcher = async (_: typeof NAMESPACE, query: string) =>
  searchSubtitle(query)

const useSearchScene = (query?: string, initialData?: Scene[]) =>
  useSWR(query ? [NAMESPACE, query] : null, searchSceneFetcher, {
    initialData,
    refreshInterval: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

export default useSearchScene
