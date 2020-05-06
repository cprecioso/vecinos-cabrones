import useStaticDataFetch from "../../data-fetch"
import { Scene } from "../types"
import { getSubtitle, NAMESPACE, saveScene } from "./internal"

const sceneFetcher = async (_: typeof NAMESPACE, id: string) => {
  const scenes = await getSubtitle(id)

  if (scenes.previous) saveScene(scenes.previous)
  if (scenes.next) saveScene(scenes.next)

  return scenes.current
}

export const useScene = (scene?: number | Scene) => {
  const id = typeof scene === "number" ? scene : scene?.id
  const initialData = typeof scene !== "number" ? scene : undefined

  return useStaticDataFetch(
    NAMESPACE,
    id != null ? "" + id : undefined,
    sceneFetcher,
    initialData
  )
}

export const getSceneContext = (scene: Scene) => ({
  prevSceneId: scene.id - 1,
  nextSceneId: scene.id + 1,
})
