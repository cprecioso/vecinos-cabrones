// @ts-check

/** @type {import("next/dist/next-server/server/config-shared").NextConfig} */
module.exports = {
  i18n: { defaultLocale: "es-ES", locales: ["es-ES"] },
  future: { webpack5: true, strictPostcssConfiguration: true },
  webpack(/** @type {import("webpack").Configuration} */ config) {
    if (!config.experiments) config.experiments = {}
    config.experiments.topLevelAwait = true

    config.module.rules.push({
      resourceQuery: /inline/,
      type: "asset/inline",
    })

    return config
  },
}
