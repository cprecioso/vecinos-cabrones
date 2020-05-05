import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import {
  getPreloadSceneData,
  PreloadedSceneData,
  usePreloadedSceneData,
} from "../../api/backend/scene"
import { ErrorView } from "../../components/FetchHelpers"
import Scene from "../../components/Scene"
import SearchBar from "../../components/SearchBar"

const useSceneId = () => {
  const router = useRouter()
  let sceneIdStr = router.query.scene
  if (Array.isArray(sceneIdStr)) sceneIdStr = sceneIdStr[0]
  if (!sceneIdStr) return null

  const sceneId = Number.parseInt(sceneIdStr, 10)
  if (isNaN(sceneId)) return null

  return sceneId
}

const ScenePage: NextPage<{ preloadedData?: PreloadedSceneData }> = ({
  preloadedData,
}) => {
  usePreloadedSceneData(preloadedData)
  const sceneId = useSceneId()

  if (sceneId != null) {
    return (
      <>
        <SearchBar compact />
        <Scene scene={sceneId} />
      </>
    )
  } else {
    return <ErrorView error="Invalid scene id" />
  }
}

ScenePage.getInitialProps = async (ctx) => {
  if (ctx.req && ctx.query.scene) {
    // We're in the server
    const sceneId = Number.parseInt(ctx.query.scene as string, 10)
    const preloadedData = await getPreloadSceneData(sceneId)
    return { preloadedData }
  } else {
    return {}
  }
}

export default ScenePage
