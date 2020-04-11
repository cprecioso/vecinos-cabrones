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

  const path = router.asPath
  const hashIndex = path.indexOf("#")
  const query =
    hashIndex !== -1 ? decodeURIComponent(path.slice(hashIndex + 1)) : ""

  const response = useSWR(scene, getSubtitle, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })
  const { data, error, isValidating } = response

  return (
    <>
      <SearchBar defaultValue={query} />

      {!scene ? null : isValidating ? (
        <LoadingView />
      ) : data ? (
        <Scene data={data} query={query} />
      ) : (
        <ErrorView error={error} />
      )}
    </>
  )
}

export default ScenePage
