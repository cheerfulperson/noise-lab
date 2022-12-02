import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules,
  },
  target: "electron-renderer",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".scss", ".json", ".css"],
  },
};
