const DATA_URI_PREFIX = "data:"
const DATA_URI_PREFIX_LENGTH = /*#__PURE__*/ DATA_URI_PREFIX.length

const BASE_64_SUFFIX = ";base64"
const BASE_64_SUFFIX_LENGTH = /*#__PURE__*/ BASE_64_SUFFIX.length

export const dataUriToStream = (dataUri: string) => {
  if (!dataUri.startsWith(DATA_URI_PREFIX)) throw new Error("Not a Data URI")

  const commaIndex = dataUri.indexOf(",")

  const meta = dataUri.slice(DATA_URI_PREFIX_LENGTH, commaIndex)

  const isBase64 = meta.endsWith(BASE_64_SUFFIX)

  const type = isBase64 ? meta.slice(0, BASE_64_SUFFIX_LENGTH) : meta

  return {
    type,
    buf: Buffer.from(dataUri.slice(commaIndex), isBase64 ? "base64" : "utf-8"),
  }
}
