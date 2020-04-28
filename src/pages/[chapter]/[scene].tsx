import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { ErrorView } from "../../components/FetchHelpers"
import Scene from "../../components/Scene"
import fetchSubtitle, {
  CacheEntry,
} from "../../components/Scene/subtitle-fetch"
import SearchBar from "../../components/SearchBar"

const ScenePage: NextPage<{ initialCurrentSceneData?: CacheEntry }> = ({
  initialCurrentSceneData,
}) => {
  const router = useRouter()
  const sceneId = Number.parseInt(
    (router.query.scene as string | undefined) ?? "",
    10
  )

  if (isNaN(sceneId)) return <ErrorView error="Invalid scene id" />

  return (
    <>
      <SearchBar compact />
      <Scene id={sceneId} initialCurrentSceneData={initialCurrentSceneData} />
    </>
  )
}

ScenePage.getInitialProps = async (ctx) => {
  if (ctx.req && ctx.query.scene) {
    // We're in the server
    const sceneId = Number.parseInt(ctx.query.scene as string, 10)

    const cachedEntry = await fetchSubtitle(sceneId, false)
    return { initialCurrentSceneData: cachedEntry }
  }
  return {}
}

export default ScenePage
