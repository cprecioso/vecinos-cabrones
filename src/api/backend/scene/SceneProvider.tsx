import React, { FunctionComponent } from "react"
import useSWR from "swr"
import { ErrorView } from "../../../components/FetchHelpers"
import { Scene, SceneId } from "../types"
import { fetchScene, NAMESPACE } from "./fetcher"
import { useSceneCache } from "./SceneCacheProvider"

type DataContext = { sceneId: SceneId; scene: Scene | undefined }
const DataContext = React.createContext<DataContext>({
  get sceneId(): SceneId {
    throw new Error("No SceneProvider")
  },
  scene: undefined,
})

export const SceneProvider: FunctionComponent<{ sceneId: SceneId }> = ({
  children,
  sceneId,
}) => {
  const { cache, addToCache } = useSceneCache()

  const cachedScene = cache.get(sceneId)

  const { data, error } = useSWR(
    cachedScene ? null : [NAMESPACE, sceneId],
    fetchScene,
    {
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  React.useEffect(() => {
    if (data) {
      if (data.current) addToCache(data.current)
      if (data.previous) addToCache(data.previous)
      if (data.next) addToCache(data.next)
    }
  }, [data])

  return (
    <>
      {error ? <ErrorView error={error || "Error desconocido"} /> : null}
      <DataContext.Provider value={{ sceneId, scene: cachedScene }}>
        {children}
      </DataContext.Provider>
    </>
  )
}

export const useSceneId = (): SceneId => React.useContext(DataContext).sceneId
export const useScene = (): Scene | undefined =>
  React.useContext(DataContext).scene
