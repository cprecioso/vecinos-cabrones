declare module "gifencoder" {
  import stream from "stream"

  class GIFEncoder {
    constructor(width: number, height: number)

    createReadStream(): stream.Readable
    createWriteStream(options: GIFEncoder.GIFOptions): stream.Transform

    start(): void
    setRepeat(
      /** 0 for repeat, -1 for no-repeat */
      repeat: number
    ): void
    setDelay(/** frame delay in ms */ delay: number): void
    setQuality(/** image quality. 10 is default */ quality: number): void
    addFrame(ctx: CanvasRenderingContext2D): void
    finish(): void
  }

  namespace GIFEncoder {
    interface GIFOptions {
      /** 0 for repeat, -1 for no-repeat */
      repeat: number
      /** frame delay in ms */
      delay: number
      /** image quality. 10 is default */
      quality: number
    }
  }

  export = GIFEncoder
}
