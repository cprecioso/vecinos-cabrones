import pMemoize from "p-memoize";
import dataUrl from "./asap-condensed-medium.woff2?inline";

export const loadFont = pMemoize(async () => {
  try {
    const fontData = await (await fetch(dataUrl)).arrayBuffer();
    const font = new FontFace("AsapCondensedMedium", fontData);
    await font.load();
    document.fonts.add(font);
    return font.family;
  } catch {
    return "sans-serif";
  }
});
