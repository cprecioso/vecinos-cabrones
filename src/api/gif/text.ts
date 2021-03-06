import {
  Alignment,
  drawBlockLayout,
  layoutBlock,
  Origin,
} from "@cprecioso/canvas-text-layout"
import fontUrl from "file-loader?name=static/[hash].[ext]&publicPath=/_next/!./asap-condensed-medium.woff2"

declare global {
  interface Document {
    fonts: FontFaceSet
  }

  class FontFace {
    constructor(family: string, source: string)
    load(): Promise<this>
    family: string
  }

  class FontFaceSet {
    add(font: FontFace): void
  }
}

const font = (async () => {
  try {
    const font = new FontFace("AsapCondensedMedium", `url(${fontUrl})`)
    await font.load()
    document.fonts.add(font)
    return font.family
  } catch (err) {
    return "sans-serif"
  }
})()

export const addText = async (canvas: HTMLCanvasElement, text: string) => {
  const { height, width } = canvas

  const ctx = canvas.getContext("2d")!

  const fontSize = 32.5
  ctx.font = `${fontSize}px ${await font}`
  ctx.fillStyle = "white"
  ctx.lineWidth = 4
  ctx.strokeStyle = "black"
  ctx.textAlign = "left"

  const maxWidth = width * 0.9
  const block = layoutBlock(ctx, text, maxWidth, fontSize)

  drawBlockLayout(ctx, block, {
    x: 0,
    containerWidth: width,
    y: height * 0.9,
    origin: Origin.Bottom | Origin.Left,
    horizontalAlignment: Alignment.Middle,
    lineOptions: {
      horizontalAlignment: Alignment.Middle,
      drawFn: (ctx, line, options) => {
        ctx.strokeText(line.text, options.x, options.y)
        ctx.fillText(line.text, options.x, options.y)
      },
    },
  })

  return canvas
}
