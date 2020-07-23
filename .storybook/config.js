import { configure } from "@storybook/react";

import "./styles.css";

const req = require.context("../react", true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
