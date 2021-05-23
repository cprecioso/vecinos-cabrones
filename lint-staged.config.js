// @ts-check

const path = require("path")
const prettier = require("prettier")

const organizeImportsExtensions = new Set([".js", ".ts", ".jsx", ".tsx"])

const prettierSupportedExtensions = new Set(
  prettier.getSupportInfo().languages.flatMap(({ extensions }) => extensions)
)

const formatArgs = (v) => {
  if (Array.isArray(v)) {
    return v.map(formatArgs).join(" ")
  } else if (typeof v === "string") {
    return `"${v}"`
  }
}

/** @type {typeof String.raw} */
const sh = (template, ...substitutions) =>
  String.raw(template, ...substitutions.map(formatArgs))

/** @type {<T>(arr: T[]) => Exclude<T, undefined | null | false | "">[]} */
const compact = (arr) => arr.filter((v) => v)

/** @type {(files: string[]) => string | string[] | Promise<string | string[]>} */
module.exports = (files) => {
  const willDedupe = files.some((file) => file.endsWith("/yarn.lock"))

  const packageJsonFiles = files.filter((file) =>
    file.endsWith("/package.json")
  )

  const organizeImportsFiles = files.filter((file) =>
    organizeImportsExtensions.has(path.extname(file))
  )

  const prettierFiles = files.filter((file) =>
    prettierSupportedExtensions.has(path.extname(file))
  )

  return compact([
    willDedupe && sh`yarn dedupe`,
    packageJsonFiles.length > 0 && sh`sort-package-json ${packageJsonFiles}`,
    organizeImportsFiles.length > 0 &&
      sh`organize-imports-cli ${organizeImportsFiles}`,
    prettierFiles.length > 0 && sh`prettier --write ${prettierFiles}`,
  ])
}
