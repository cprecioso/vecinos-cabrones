import { Paint, Surface } from "canvaskit-wasm"
import fs from "fs"
import url from "url"
import CanvasKit from "../canvas"

const readImport = async (importUrl: URL) =>
  await fs.promises.readFile(url.fileURLToPath(importUrl.href))

const fontData = await readImport(
  new URL("./asap-condensed-medium.woff2", import.meta.url)
)
const FONT_NAME = "ASAP"

const Provider = CanvasKit.TypefaceFontProvider.Make()
Provider.registerFont(fontData, FONT_NAME)

export const addText = async (surface: Surface, text: string) => {
  const width = surface.width()
  const height = surface.height()
  const maxWidth = width * 0.9

  const canvas = surface.getCanvas()

  const fillPaint = new CanvasKit.Paint()
  fillPaint.setStyle(CanvasKit.PaintStyle.Fill)
  fillPaint.setColor(CanvasKit.WHITE)

  const strokePaint = new CanvasKit.Paint()
  strokePaint.setStyle(CanvasKit.PaintStyle.Stroke)
  strokePaint.setColor(CanvasKit.BLACK)
  strokePaint.setStrokeWidth(4)

  const textStyle = new CanvasKit.TextStyle({
    color: CanvasKit.WHITE,
    fontFamilies: [FONT_NAME],
    fontSize: 32.5,
    heightMultiplier: 1,
  })

  const bgPaint = new CanvasKit.Paint()
  bgPaint.setAlphaf(0)

  const paragraphStyle = new CanvasKit.ParagraphStyle({
    textStyle,
    textAlign: CanvasKit.TextAlign.Center,
    maxLines: 3,
    ellipsis: "...",
  })

  const drawText = (fgPaint: Paint) => {
    const paragraphBuilder = CanvasKit.ParagraphBuilder.MakeFromFontProvider(
      paragraphStyle,
      Provider
    )
    paragraphBuilder.pushPaintStyle(textStyle, fgPaint, bgPaint)
    paragraphBuilder.addText(text)
    const paragraph = paragraphBuilder.build()
    paragraph.layout(maxWidth)

    const paragraphHeight = paragraph.getHeight()

    canvas.drawParagraph(
      paragraph,
      (width - maxWidth) / 2,
      height * 0.9 - paragraphHeight
    )
  }

  drawText(strokePaint)
  drawText(fillPaint)

  return surface
}
