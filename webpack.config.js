import { resolve } from "path";

const config = {
  entry: {
    app: resolve("./src/index.ts"),
  },
  output: {
    path: resolve("./dist"),
    filename: "index.cjs",
    library: {
      type: "commonjs",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
  mode: "production",
  devtool: "source-map",
  bail: true,
};
export default config;
