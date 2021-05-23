import dataUrl from "./asap-condensed-medium.woff2?inline"

declare global {
  interface Document {
    fonts: FontFaceSet
  }

  class FontFace {
    constructor(
      family: string,
      source: string | ArrayBufferLike | ArrayBufferView
    )
    load(): Promise<this>
    family: string
  }

  class FontFaceSet {
    add(font: FontFace): void
  }
}

const load = async () => {
  try {
    const fontData = await (await fetch(dataUrl)).arrayBuffer()
    const font = new FontFace("AsapCondensedMedium", fontData)
    await font.load()
    document.fonts.add(font)
    return font.family
  } catch (err) {
    return "sans-serif"
  }
}

export default await load()
