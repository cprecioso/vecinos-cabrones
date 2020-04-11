import React from "react"
import {
  parseSubtitleTimestamp,
  printWithDecimalPlaces,
  range,
  roundToMultiple,
} from "../util/timestamp"
import { SubtitleResult } from "./types"

const urlFromSearchResult = (
  season: number,
  episode: number,
  timestamp: number
) =>
  `https://anhqv.us-east-1.linodeobjects.com/${episode}-${season}/${episode}-${season}-${printWithDecimalPlaces(
    timestamp,
    3,
    2
  )}.jpg`

export function getUrlsForSearchResultThumbnail(result: SubtitleResult) {
  const season = result.chapter.seasonNumber
  const episode = result.chapter.episodeNumber
  const start = roundToMultiple(parseSubtitleTimestamp(result.start), 200)
  const end = roundToMultiple(parseSubtitleTimestamp(result.end), 200)
  const timestampRange = range(start, end, 200)
  const urlRange = timestampRange.map((timestamp) =>
    urlFromSearchResult(season, episode, timestamp)
  )

  return urlRange
}

export const useFrameUrls = (result: SubtitleResult) =>
  React.useMemo(() => getUrlsForSearchResultThumbnail(result), [result.id])

export const getClosestFrameUrl = (result: SubtitleResult) =>
  urlFromSearchResult(
    result.chapter.seasonNumber,
    result.chapter.episodeNumber,
    roundToMultiple(parseSubtitleTimestamp(result.start), 200)
  )
