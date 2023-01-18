import IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from "dotenv-webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new Dotenv(),
  new CopyPlugin({
    patterns: [
      { from: "src/files", to: "files" },
    ],
  }),
];
