const { JSDOM } = require("jsdom");
const channels = require("worker_threads");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;
window.HTMLCanvasElement.prototype.getContext = () => {
    return {};
};
global.MessageChannel = channels.MessageChannel;
global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: "node.js"
};
global.fetch = require("node-fetch");
