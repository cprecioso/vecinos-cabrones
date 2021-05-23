declare module "gif-encoder-2" {
  class GIFEncoder {
    constructor(
      width: number,
      height: number,
      algorithm?: "neuquant" | "octree",
      useOptimizer?: boolean,
      totalFrames?: number
    )

    start(): void
    addFrame(ctx: CanvasRenderingContext2D): void
    setDelay(ms: number): void
    setFramesPerSecond(fps: number): void
    setQuality(quality: number): void
    setThreshold(threshold: number): void
    setRepeat(times: number): void
    finish(): void

    createReadStream(): NodeJS.ReadableStream

    readonly out: {
      getData(): Buffer
    }
  }

  export = GIFEncoder
}
