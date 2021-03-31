// eslint-disable-next-line @typescript-eslint/no-unused-vars
import webpack from "webpack";

module.exports = {
  mode: "production",
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
