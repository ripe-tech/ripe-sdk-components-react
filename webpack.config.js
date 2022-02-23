const path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "ripe-sdk-components-react.min.js?[fullhash]",
        library: "RipeSdkComponentsReact",
        libraryTarget: "umd",
        publicPath: "/"
    },
    devServer: {
        compress: false,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        regenerator: true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                type: "asset/inline"
            },
            {
                resourceQuery: /raw/,
                type: "asset/source"
            }
        ]
    },
    resolve: {
        fallback: {
            fs: false,
            path: false,
            http: false,
            https: false,
            process: false
        }
    }
};
