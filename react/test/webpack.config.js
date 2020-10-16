const config = require("../../webpack.config");

config.mode = "development";
config.target = "node";

config.output.devtoolModuleFilenameTemplate = "[absolute-resource-path]";
config.output.devtoolFallbackModuleFilenameTemplate = "[absolute-resource-path]?[hash]";
config.output.filename = "ripe-sdk-components-react-test.min.js";

config.module.rules = config.module.rules.filter(
    rule =>
        !rule.use ||
        rule.use.every(loader => {
            const name = typeof loader === "object" ? loader.loader : loader;
            return !["babel-loader", "style-loader"].includes(name);
        })
);
config.module.rules.push(
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "babel-loader",
                query: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    node: "current"
                                }
                            }
                        ],
                        [
                            "@babel/preset-react",
                            {
                                targets: {
                                    node: "current"
                                }
                            }
                        ]
                    ],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                }
            }
        ]
    },
    {
        test: /\.(css|scss|sass)$/,
        use: ["null-loader"]
    }
);

module.exports = config;
