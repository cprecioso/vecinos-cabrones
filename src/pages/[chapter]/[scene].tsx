import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { _sceneFetcher } from "../../api/backend/scene"
import { Scene as IScene } from "../../api/backend/types"
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

const ScenePage: NextPage<{ initialScene?: IScene }> = ({ initialScene }) => {
  const sceneId = useSceneId()

  if (sceneId != null) {
    return (
      <>
        <SearchBar compact />
        <Scene id={sceneId} scene={initialScene} />
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
    const scene = await _sceneFetcher("scene", "" + sceneId)
    return { initialScene: scene }
  } else {
    return {}
  }
}

export default ScenePage
