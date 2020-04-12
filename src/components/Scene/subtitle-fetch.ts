import getSubtitle from "../../backend/getSubtitle"
import { SubtitleResult } from "../../backend/types"
import useRequest from "../../util/request"

export interface CacheEntry {
  scene: SubtitleResult
  noPrevious?: boolean
  noNext?: boolean
}

const cache = new Map<number, CacheEntry>()
if (globalThis.window) Object.assign(window, { subCache: cache })

export const saveInCache = (
  scene: SubtitleResult,
  options: Omit<CacheEntry, "scene">
) => {
  const entry: CacheEntry = { ...options, scene }
  cache.set(scene.id, entry)
  return entry
}

export const useFetchSubtitleInContext = (id: number) => {
  const current = useRequest("" + id, fetchSubtitle)
  const previous = useRequest(() => {
    if (current.data?.noPrevious) throw ""
    return "" + (id - 1)
  }, fetchSubtitle)
  const next = useRequest(() => {
    if (current.data?.noNext) throw ""
    return "" + (id + 1)
  }, fetchSubtitle)

  return { current, previous, next }
}

const fetchSubtitle = async (id: number | string, full = false) => {
  if (typeof id === "string") {
    id = parseInt(id, 10)
    if (isNaN(id)) throw new Error("Invalid sceneId")
  }

  if (cache.has(id)) {
    const current = cache.get(id)!
    if (
      !full ||
      (current.noPrevious != undefined && current.noNext != undefined)
    ) {
      return current
    }
  }

  const subtitles = await getSubtitle(id)

  const entry = saveInCache(subtitles.current, {
    noPrevious: !subtitles.previous,
    noNext: !subtitles.next,
  })
  if (subtitles.previous) saveInCache(subtitles.previous, {})
  if (subtitles.next) saveInCache(subtitles.next, {})

  return entry
}

export default fetchSubtitle
