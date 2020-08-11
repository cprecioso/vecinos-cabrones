import React, { FunctionComponent } from "react"
import useSWR from "swr"
import { ErrorView, LoadingView } from "../../../components/FetchHelpers"
import { Scene, SceneId } from "../types"
import { fetchScene, NAMESPACE, SceneFetchData as Data } from "./fetcher"

type DataContext = {
  sceneId: SceneId
  data?: Data
}

const DataContext = React.createContext<DataContext>({
  get sceneId(): DataContext["sceneId"] {
    throw new Error("No SceneProvider found")
  },
})

export const SceneProvider: FunctionComponent<DataContext> = ({
  children,
  sceneId,
  data: propsData,
}) => {
  const { data: ctxData } = React.useContext(DataContext)
  const preloadedData = React.useMemo<Data>(
    () => ({ ...ctxData, ...propsData }),
    [ctxData, propsData]
  )
  const initialData = preloadedData[sceneId] ? preloadedData : undefined

  const { data, error, isValidating } = useSWR(
    [NAMESPACE, sceneId, preloadedData],
    fetchScene,
    {
      initialData,
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  )

  return (
    <>
      {isValidating ? <LoadingView /> : null}
      {error ? <ErrorView error={error || "Error desconocido"} /> : null}
      <DataContext.Provider value={{ sceneId, data }}>
        {children}
      </DataContext.Provider>
    </>
  )
}

export const useSceneId = (): SceneId => React.useContext(DataContext).sceneId

export const useScene = (): Scene | undefined => {
  const sceneId = useSceneId()
  return React.useContext(DataContext).data?.[sceneId]
}
