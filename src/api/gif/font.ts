import dataUrl from "./asap-condensed-medium.woff2?inline"

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
