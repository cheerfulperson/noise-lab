import type { ForgeConfig } from "@electron-forge/shared-types";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
// eslint-disable-next-line import/namespace
import { rendererConfig } from "./webpack.renderer.config";
import MakerSquirrel from "@electron-forge/maker-squirrel";
import ZipMaker from "@electron-forge/maker-zip";

const config: ForgeConfig = {
  packagerConfig: {
    icon: "./public/assets/icon.png",
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      noMsi: false,
    }),
    new ZipMaker({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./public/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
