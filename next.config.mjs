// @ts-check

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
export default withVanillaExtract({
  webpack(/** @type {import("webpack").Configuration} */ config) {
    if (!config.experiments) config.experiments = {};
    config.experiments.topLevelAwait = true;

    config.module ??= {};
    config.module.rules ??= [];

    config.module.rules.push({
      resourceQuery: /inline/,
      type: "asset",
    });

    config.module.rules.push({
      test: /\.tsv$/,
      loader: "dsv-loader",
      options: { delimiter: "\t" },
    });

    return config;
  },

  images: {
    domains: ["anhqv.us-east-1.linodeobjects.com"],
  },
});
