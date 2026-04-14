import fs from "fs";
import path from "path";

/**
 * Reads an SVG file and returns a CSS url() data-URI string.
 * Safe to call from vanilla-extract .css.ts files (Node.js build context).
 */
export const svgUrl = (relativePath: string): string => {
  const absPath = path.resolve(process.cwd(), "src/styles", relativePath);
  const raw = fs.readFileSync(absPath, "utf-8");
  const encoded = raw
    .replace(/\s*\n\s*/g, " ")
    .replace(/"/g, "'")
    .replace(/#/g, "%23")
    .trim();
  return `url("data:image/svg+xml,${encoded}")`;
};
