// @ts-check

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

/** @type {import("next").NextConfig} */
export default withVanillaExtract({
  typedRoutes: true,
  experimental: {
    typedEnv: true,
    viewTransition: true,
  },

  turbopack: {
    rules: {
      "*.tsv": { type: "bytes" },
    },
  },

  images: {
    unoptimized: true,
  },
});
