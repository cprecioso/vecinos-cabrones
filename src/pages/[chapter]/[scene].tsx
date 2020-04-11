import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { ErrorView } from "../../components/FetchHelpers"
import Scene from "../../components/Scene"
import SearchBar from "../../components/SearchBar"

const ScenePage: NextPage = () => {
  const router = useRouter()
  const sceneId = Number.parseInt(
    (router.query.scene as string | undefined) ?? "",
    10
  )

  if (isNaN(sceneId)) return <ErrorView error="Invalid scene id" />

  return (
    <>
      <SearchBar />

      <Scene initialSceneId={sceneId} />
    </>
  )
}

export default ScenePage
