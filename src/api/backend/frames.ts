import React from "react"
import {
  parseSubtitleTimestamp,
  printWithDecimalPlaces,
  range,
  roundToMultiple,
} from "../../util/timestamp"
import { Scene } from "./types"

const thumbnailUrlFromSceneInfo = (
  season: number,
  episode: number,
  timestamp: number
) =>
  `https://anhqv.us-east-1.linodeobjects.com/${episode}-${season}/${episode}-${season}-${printWithDecimalPlaces(
    timestamp,
    3,
    2
  )}.jpg`

function getUrlsForSearchResultThumbnail(scene: Scene) {
  const season = scene.chapter.seasonNumber
  const episode = scene.chapter.episodeNumber
  const start = roundToMultiple(parseSubtitleTimestamp(scene.start), 200)
  const end = roundToMultiple(parseSubtitleTimestamp(scene.end), 200)
  const timestampRange = range(start, end, 200)
  const urlRange = timestampRange.map((timestamp) =>
    thumbnailUrlFromSceneInfo(season, episode, timestamp)
  )
  return urlRange
}
export const getFrames = getUrlsForSearchResultThumbnail

export const useFrames = (result: Scene) =>
  React.useMemo(() => getUrlsForSearchResultThumbnail(result), [result.id])

const getClosestFrameUrl = (result: Scene) =>
  thumbnailUrlFromSceneInfo(
    result.chapter.seasonNumber,
    result.chapter.episodeNumber,
    roundToMultiple(parseSubtitleTimestamp(result.start), 200)
  )

export const useMainFrame = (scene?: Scene) =>
  React.useMemo(
    () => (scene ? getClosestFrameUrl(scene) : undefined),
    [scene?.id]
  )
