import Lambda from "aws-sdk/clients/lambda"
import AWS from "aws-sdk/global"

AWS.config.region = "us-east-1"
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:f32f8263-a898-4b1a-a6ff-0edb37c15c0e",
})
AWS.config.apiVersion = "2015-03-31"

const lambdaAgent = new Lambda()

interface SearchPayload {
  statusCode: number
  results: string
}

export interface SearchResult {
  text: string
  start: string
  end: string
  chapter: {
    id: string
    episodeNumber: number
    seasonNumber: number
  }
}

export default async function search(search: string) {
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

  if (response.StatusCode !== 200) throw new Error("Unknown status code")
  const innerResponse = JSON.parse(response.Payload as string) as SearchPayload
  if (innerResponse.statusCode !== 200) throw new Error("Unknown status code")

  const results = JSON.parse(innerResponse.results) as SearchResult[]

  return results
}
