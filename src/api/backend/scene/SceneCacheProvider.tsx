import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Scene, SceneId } from "../types";

export type SceneCache = Map<SceneId, Scene>;
type ContextState = { cache: SceneCache };
type ContextActions = { addToCache: (scene: Scene) => void };
export type SceneCacheContext = ContextState & ContextActions;

const Context = createContext<SceneCacheContext>({
  cache: new Map(),
  addToCache: () => {},
});

export const SceneCacheProvider = ({
  children,
  initialCache,
}: {
  initialCache?: Scene[];
  children?: ReactNode;
}) => {
  const [state, setState] = useState<ContextState>(() => ({
    cache: new Map(initialCache?.map((scene) => [scene.id, scene])),
  }));

  const addToCache = useCallback<ContextActions["addToCache"]>(
    (scene: Scene) =>
      setState((oldState) => ({
        ...oldState,
        cache: oldState.cache.set(scene.id, scene),
      })),
    [],
  );

  const ctx = useMemo<SceneCacheContext>(
    () => ({ ...state, addToCache }),
    [state],
  );

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

export const useSceneCache = () => useContext(Context);
