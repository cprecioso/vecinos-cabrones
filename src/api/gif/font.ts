// @ts-expect-error no types for woff2
import fontUrl from "./asap-condensed-medium.woff2";

const loadFont = async () => {
  try {
    const fontData = await (await fetch(fontUrl)).arrayBuffer();
    const font = new FontFace("AsapCondensedMedium", fontData);
    await font.load();
    document.fonts.add(font);
    return font.family;
  } catch {
    return "sans-serif";
  }
};

export const fontFamilyName = await loadFont();
