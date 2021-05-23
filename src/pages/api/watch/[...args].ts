import { NextApiHandler } from "next"
import { Scene } from "../../../api/backend/types"
import asins from "../../../prime-episodes.json"
import { parseSubtitleTimestamp } from "../../../util/timestamp"

type Args = [season?: string, episode?: string, ts?: string]

export const makeWatchLink = (scene?: Scene) => {
  const ts = scene && Math.floor(parseSubtitleTimestamp(scene.start) / 1000)
  const args = [scene?.chapter.seasonNumber, scene?.chapter.episodeNumber, ts]
    .filter((v): v is number => v != null)
    .map((v) => "" + v)
    .join("/")
  return `/api/watch/${args}`
}

type Query = { args: Args }

const toNumber = (string: string | undefined) => {
  if (!string) return null
  const number = Number.parseInt(string, 10)
  if (Number.isNaN(number)) return null
  return number
}

const getAsin = (
  season?: string | undefined,
  episode?: string | undefined
): string | undefined =>
  asins.seasons[(toNumber(season) ?? 1) - 1]?.episodes[
    (toNumber(episode) ?? 1) - 1
  ]

const getLink = ([season, episode, ts]: Args) => {
  const asin = getAsin(season, episode)
  if (!asin) return null
  const url = new URL(asin, `https://www.primevideo.com/detail/`)
  url.searchParams.set("autoplay", "1")
  if (ts != null) url.searchParams.set("t", ts)
  return url.href
}

const handler: NextApiHandler = (req, res) => {
  res.setHeader("Cache-Control", "max-age=31536000, public, immutable")

  try {
    const link = getLink((req.query as Query).args)
    if (link) {
      res.redirect(301, link)
      return
    }
  } catch {}

  res.status(404).end("Unrecognized")
}

export default handler
