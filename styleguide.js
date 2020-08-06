if (window.location.pathname === "/storybook") {
    const script = document.createElement("base");
    script.href = "/storybook/";
    document.getElementsByTagName("head")[0].appendChild(script);
}
