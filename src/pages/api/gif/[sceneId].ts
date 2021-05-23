import { NextApiHandler } from "next"
import stream from "stream"
import util from "util"
import { getFrames } from "../../../api/backend/frames"
import { fetchScene } from "../../../api/backend/scene/fetcher"
import { makeGifStream } from "../../../api/gif"

const pipeline = util.promisify(stream.pipeline)

type Query = { sceneId: string }

const handler: NextApiHandler = async (req, res) => {
  try {
    const { sceneId } = req.query as Query
    const sceneN = Number.parseInt(sceneId, 10)
    if (!sceneId || Number.isNaN(sceneN)) throw new Error("Unrecognized scene")

    const { current: scene } = await fetchScene("scene", sceneN)
    if (!scene) throw new Error("Scene not found")
    const frameUrls = getFrames(scene)

    const gifStream = await makeGifStream(frameUrls, { text: scene.text })

    res.setHeader("Content-Type", "image/gif")
    res.setHeader("Cache-Control", "max-age=31536000, public, immutable")
    return await pipeline(gifStream, res)
  } catch (err) {
    res.status(500).end("" + err)
  }
}

export default handler
