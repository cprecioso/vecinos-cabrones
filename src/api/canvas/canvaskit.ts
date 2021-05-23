import CanvasKitInit, { CanvasKit as CanvasKitType } from "canvaskit-wasm"
import fs from "fs"
import url from "url"

const readImport = async (importUrl: URL) =>
  await fs.promises.readFile(url.fileURLToPath(importUrl.href))

const load = async () => {
  return (await (CanvasKitInit as any)({
    async instantiateWasm(
      imports: any,
      cb: (instance: WebAssembly.Instance) => void
    ) {
      const wasmData = await readImport(
        new URL(
          "../../../node_modules/canvaskit-wasm/bin/canvaskit.wasm",
          import.meta.url
        )
      )
      const wasm = await WebAssembly.instantiate(wasmData, imports)

      cb(wasm.instance)
    },
  })) as CanvasKitType
}

export default await load()
