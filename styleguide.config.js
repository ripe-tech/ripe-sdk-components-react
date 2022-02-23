module.exports = {
    styleguideDir: "dist/styleguide",
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
