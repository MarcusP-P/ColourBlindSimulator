const webpack = require("webpack"); // eslint-disable-line
const path = require("path"); // eslint-disable-line
const CopyPlugin = require("copy-webpack-plugin"); // eslint-disable-line
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

// The origional version of this file was generated using
// https://createapp.dev/webpack/no-library--copywebpackplugin--typescript

const plugins = [
    new CopyPlugin({
        patterns: [
            {
                from: "./*.html",
                to: "",
            },
        ],
    }),

    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "index.css",
    }),

];


const config = {
    plugins,
    entry: [
        "./src/index.ts",
        "./src/styles.scss",
    ],
    output: {
        path: path.resolve(__dirname, "dist"), // eslint-disable-line
        filename: "index.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: [
                    "/node_modules/",
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },

                    "css-loader",
                    "sass-loader"

                ],
            },
        ],
    },
    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".js",
            ".scss",
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
    devtool: "eval-source-map"
};

module.exports = config; // eslint-disable-line
