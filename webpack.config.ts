import path from "path";
import { Configuration } from "webpack";

const CopyPlugin = require('copy-webpack-plugin');

const config: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
    client: {
      logging: "info",
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    hot: true,
    port: 4000,
    bonjour: true,
  },
  plugins: [
      new CopyPlugin ({
          patterns: [
              {
                  from: "./*.html",
                  to: "",
              }
          ]
      }),
  ],
  devtool: "eval-source-map"
};

export default config;