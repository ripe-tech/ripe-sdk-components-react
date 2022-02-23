module.exports = {
    stories: ["../react/**/*.stories.js"],
    addons: ["@storybook/addon-knobs", "@storybook/addon-storysource"],
    core: {
        builder: "webpack5"
    }
};
