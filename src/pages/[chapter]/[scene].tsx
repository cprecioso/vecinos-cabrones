import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import {
  preloadScene,
  SceneFetchData,
  SceneProvider,
} from "../../api/backend/scene"
import { ErrorView, LoadingView } from "../../components/FetchHelpers"
import Scene from "../../components/Scene"
import SearchBar from "../../components/SearchBar"

const parseSceneId = (sceneIdStr?: string | string[]) => {
  if (Array.isArray(sceneIdStr)) sceneIdStr = sceneIdStr[0]
  if (!sceneIdStr) return null

  const sceneId = Number.parseInt(sceneIdStr, 10)
  if (isNaN(sceneId)) return null
  return sceneId
}

type Props = {
  preloadedData?: SceneFetchData
}
type Params = { chapter: string; scene: string }

const ScenePage: NextPage<Props> = ({ preloadedData }) => {
  const router = useRouter()
  const sceneId = parseSceneId(router.query.scene)

  if (sceneId != null || router.isFallback) {
    return (
      <>
        <SearchBar compact />
        {sceneId != null ? (
          <SceneProvider sceneId={sceneId} data={preloadedData}>
            <Scene />
          </SceneProvider>
        ) : (
          <LoadingView />
        )}
      </>
    )
  } else {
    return <ErrorView error="Invalid scene id" />
  }
}
export default ScenePage

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const sceneId = parseSceneId(params?.scene)
  if (sceneId) {
    const preloadedData = await preloadScene(sceneId)
    return { props: { preloadedData } }
  }
  return { props: {} }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: true,
})
