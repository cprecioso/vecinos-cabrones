import React, { FunctionComponent } from "react"
import { Scene, SceneId } from "../types"

export type SceneCache = Map<SceneId, Scene>
type ContextState = { cache: SceneCache }
type ContextActions = { addToCache: (scene: Scene) => void }
export type SceneCacheContext = ContextState & ContextActions

const Context = React.createContext<SceneCacheContext>({
  cache: new Map(),
  addToCache: () => {},
})

export const SceneCacheProvider: FunctionComponent<{
  initialCache?: Scene[]
}> = ({ children, initialCache }) => {
  const [state, setState] = React.useState<ContextState>(() => ({
    cache: new Map(initialCache?.map((scene) => [scene.id, scene])),
  }))

  const addToCache = React.useCallback<ContextActions["addToCache"]>(
    (scene: Scene) =>
      setState((oldState) => ({
        ...oldState,
        cache: oldState.cache.set(scene.id, scene),
      })),
    []
  )

  const ctx = React.useMemo<SceneCacheContext>(
    () => ({ ...state, addToCache }),
    [state]
  )

  return <Context.Provider value={ctx}>{children}</Context.Provider>
}

export const useSceneCache = () => React.useContext(Context)
