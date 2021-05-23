import { Surface } from "canvaskit-wasm"
import CanvasKit from "../canvas"

export const loadImage = async (url: string) => {
  const imgData = await (await fetch(url)).arrayBuffer()

  const img = CanvasKit.MakeImageFromEncoded(imgData)!

  const surface = CanvasKit.MakeSurface(img.width(), img.height())!
  const paint = new CanvasKit.Paint()
  surface.getCanvas().drawImage(img, 0, 0, paint)

  return surface
}

export const surfaceToCanvas = (surface: Surface) => {
  surface.flush()
  const image = surface.makeImageSnapshot()
  surface.delete()
  return CanvasKit.MakeCanvas(image.width(), image.height())
}
