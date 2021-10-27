// @ts-check

/** @type {import("next").NextConfig} */
module.exports = {
  i18n: { defaultLocale: "es-ES", locales: ["es-ES"] },
  future: { strictPostcssConfiguration: true },
  webpack(/** @type {import("webpack").Configuration} */ config) {
    if (!config.experiments) config.experiments = {}
    config.experiments.topLevelAwait = true

    config.module.rules.push({
      resourceQuery: /inline/,
      type: "asset",
    })

    config.module.rules.push({
      test: /\.tsv$/,
      loader: "dsv-loader",
      options: { delimiter: "\t" },
    })

    return config
  },

  images: {
    domains: ["anhqv.us-east-1.linodeobjects.com"],
  },
}
