module.exports = {
    styleguideDir: "dist/styleguide",
    webpackConfig: Object.assign({}, require("./webpack.config"), {
        externals: {}
    }),
    sections: [
        {
            name: "Introduction",
            content: "./README.md"
        },
        {
            name: "Components",
            components: "react/components/**/!(index|*.stories).js"
        },
        {
            name: "Storybook",
            href: "/storybook"
        }
    ]
};
