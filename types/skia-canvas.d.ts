declare module "skia-canvas" {
  export class Canvas {
    constructor(width: number, height: number)
    getContext(type: "2d"): CanvasRenderingContext2D
    pages: CanvasRenderingContext2D[]
    pdf: Buffer
    svg: Buffer
    jpg: Buffer
    png: Buffer
    newPage(width: number, height: number): CanvasRenderingContext2D
    saveAs(
      filename: string,
      options?: { format?: string; quality?: number }
    ): void
    toBuffer(
      format: string,
      options?: { quality?: number; page?: number }
    ): Buffer
    toDataUrl(
      format: string,
      options?: { quality?: number; page?: number }
    ): string
  }
  export class CanvasGradient extends globalThis.CanvasGradient {}
  export class CanvasPattern extends globalThis.CanvasPattern {}
  export class CanvasRenderingContext2D extends globalThis.CanvasRenderingContext2D {}
  export class DOMMatrix extends globalThis.DOMMatrix {}
  export class Image extends globalThis.Image {}
  export class ImageData extends globalThis.ImageData {}
  export class Path2D extends globalThis.Path2D {}

  export function loadImage(src: string | Buffer): Promise<Image>

  export interface FontFamily {
    family: string
    weights: number[]
    widths: string[]
    styles: string[]
  }

  export interface FontVariant {
    family: string
    weight: number
    style: string
    width: string
    file: string
  }

  export interface FontLibrary {
    families: string[]
    family(name: string): FontFamily | undefined
    has(familyName: string): boolean
    use(familyName: string, fontPaths: string[]): FontVariant[]
    use(fontPaths: string[]): FontVariant[]
    use(
      families: Record<string, string[] | string>
    ): Record<string, FontVariant[] | FontVariant>
  }

  export const FontLibrary: FontLibrary
}
