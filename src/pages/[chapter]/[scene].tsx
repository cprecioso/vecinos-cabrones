import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import getSubtitle from "../../backend/getSubtitle"
import { ErrorView, LoadingView } from "../../components/FetchHelpers"
import Scene from "../../components/Scene"
import SearchBar from "../../components/SearchBar"
import useRequest from "../../util/request"

const ScenePage: NextPage = () => {
  const router = useRouter()
  const scene = (router.query.scene as string | undefined) ?? ""

  const response = useRequest(scene, getSubtitle)
  const { data, error, isValidating } = response

  return (
    <>
      <SearchBar />

      {!scene ? null : isValidating ? (
        <LoadingView />
      ) : data ? (
        <Scene data={data} />
      ) : (
        <ErrorView error={error} />
      )}
    </>
  )
}

export default ScenePage
