const webpack = require("webpack"); // eslint-disable-line
const path = require("path"); // eslint-disable-line
const CopyPlugin = require("copy-webpack-plugin"); // eslint-disable-line

// The origional version of this file was generated using
// https://createapp.dev/webpack/no-library--copywebpackplugin--typescript

const config = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"), // eslint-disable-line
        filename: "bundle.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".js"
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"), // eslint-disable-line
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
        new CopyPlugin({
            patterns: [
                {
                    from: "./*.html",
                    to: "",
                },
            ],
        }),
    ],
};

module.exports = config; // eslint-disable-line
