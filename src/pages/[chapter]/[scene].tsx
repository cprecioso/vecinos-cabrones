import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import getSubtitle from "../../backend/getSubtitle"
import { ErrorView, LoadingView } from "../../components/FetchHelpers"
import Scene from "../../components/Scene"
import SearchBar from "../../components/SearchBar"

const ScenePage: NextPage = () => {
  const router = useRouter()
  const scene = (router.query.scene as string | undefined) ?? ""

  const response = useSWR(scene, getSubtitle, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })
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
