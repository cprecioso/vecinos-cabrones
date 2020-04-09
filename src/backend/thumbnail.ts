import { SearchResult } from "./search"

const THUMBNAIL_FREQ_HZ = 5 // 1 frame every 0.2 s

// "start":"00:46:21.680","end":"00:46:25.280"
const timestampRe = /(\d{2}):(\d{2}):(\d{2})\.(\d{3})/
const parseAndRoundTimestamp = (ts: string) => {
  const [, _h, _m, _s, _ms] = ts.match(timestampRe)!

  const h = parseInt(_h, 10)
  const m = parseInt(_m, 10) + h * 60
  const s = parseInt(_s, 10) + m * 60
  const ms = parseInt(_ms, 10)

  const csRoundedToFreq =
    ((((ms * THUMBNAIL_FREQ_HZ) / 1000) | 0) * 100) / THUMBNAIL_FREQ_HZ

  return `${s}.${csRoundedToFreq.toString(10).padEnd(2, "0")}`
}

export default function getUrlForSearchResultThumbnail(result: SearchResult) {
  const season = result.chapter.seasonNumber
  const episode = result.chapter.episodeNumber
  const roundedSecond = parseAndRoundTimestamp(result.start)
  return `https://anhqv.us-east-1.linodeobjects.com/${episode}-${season}/${episode}-${season}-${roundedSecond}.jpg`
}
