const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'ts-loader',
        exclude: /node_modules/,

      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
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
