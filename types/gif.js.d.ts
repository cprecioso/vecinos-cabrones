declare module "gif.js" {
  import { EventEmitter } from "events";

  namespace GIF {
    interface Options {
      repeat?: number;
      quality?: number;
      workers?: number;
      workerScript?: string;
      background?: string;
      width?: number | null;
      height?: number | null;
      transparent?: string | null;
      dither?: boolean;
      debug?: boolean;
    }

    interface AddFrameOptions {
      delay?: number;
      copy?: boolean;
      dispose?: number;
    }
  }
  class GIF extends EventEmitter {
    constructor(options?: GIF.Options);

    addFrame(
      image:
        | CanvasImageSource
        | CanvasRenderingContext2D
        | WebGLRenderingContext
        | ImageData,
      options?: GIF.AddFrameOptions,
    ): void;

    on(
      event: "finished",
      listener: (blob: Blob, data: Uint8Array) => void,
    ): this;
    on(event: "abort", listener: () => void): this;
    on(event: "start", listener: () => void): this;
    on(event: "progress", listener: (percent: number) => void): this;

    once(
      event: "finished",
      listener: (blob: Blob, data: Uint8Array) => void,
    ): this;
    once(event: "abort", listener: () => void): this;
    once(event: "start", listener: () => void): this;
    once(event: "progress", listener: (percent: number) => void): this;

    render(): void;
  }
  export = GIF;
}
