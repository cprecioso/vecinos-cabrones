import React from "react"
import { Scene } from "../types"
import { getSubtitle, saveScene } from "./internal"

export type PreloadedSceneData = Scene[]

export const getPreloadSceneData = async (id: number) => {
  const { previous, next, current } = await getSubtitle("" + id)
  return [previous, next, current].filter(
    (scene) => scene != null
  ) as PreloadedSceneData
}

export const usePreloadedSceneData = (preloadedData?: PreloadedSceneData) => {
  React.useMemo(() => {
    if (!preloadedData) return null
    for (const scene of preloadedData) {
      saveScene(scene)
    }
  }, [preloadedData])
}
