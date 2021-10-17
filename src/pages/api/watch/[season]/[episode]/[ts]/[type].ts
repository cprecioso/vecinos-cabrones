import { Scene } from "@/api/backend/types"
import episodesData, { LinkType } from "@/data/episodes-data.tsv"
import { parseSubtitleTimestamp } from "@/util/timestamp"
import { NextApiHandler } from "next"

export type { LinkType }

export const makeWatchLink = (scene: Scene, type: LinkType) => {
  const ts = scene && Math.floor(parseSubtitleTimestamp(scene.start) / 1000)
  const args = [
    scene?.chapter.seasonNumber,
    scene?.chapter.episodeNumber,
    ts,
    type,
  ]
    .filter((v): v is number => v != null)
    .map((v) => "" + v)
    .join("/")
  return `/api/watch/${args}`
}

type Query = { season: string; episode: string; ts: string; type: LinkType }

const getUrl = (
  seasonN: string,
  episodeN: string,
  type: LinkType
): URL | null => {
  const episodeLink = episodesData.find(
    (episode) =>
      episode["data-season"] === seasonN && episode["data-episode"] === episodeN
  )?.[`${type}-link`]

  if (!episodeLink) return null
  return new URL(episodeLink)
}

const getLink = ({ season, episode, ts, type }: Query) => {
  const baseUrl = getUrl(season, episode, type)
  if (!baseUrl) return null
  const url = new URL(baseUrl)
  if (ts != null) url.searchParams.set("t", ts)
  return url.href
}

const handler: NextApiHandler = (req, res) => {
  res.setHeader("Cache-Control", "max-age=31536000, public, immutable")

  try {
    const link = getLink(req.query as Query)
    if (link) {
      res.redirect(301, link)
      return
    }
  } catch {}

  res.status(404).end("Unrecognized")
}

export default handler
