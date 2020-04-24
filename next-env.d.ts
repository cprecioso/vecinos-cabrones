/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "file-loader*" {
  declare const url: string
  export default url
}

interface Document {
  fonts: FontFaceSet
}

class FontFace {
  constructor(family: string, source: string)
  load(): Promise<this>
  family: string
}

class FontFaceSet {
  add(font: FontFace): void
}
