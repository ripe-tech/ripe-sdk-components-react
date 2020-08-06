if (window.location.pathname === "/") {
    const script = document.createElement("base");
    script.href = "/styleguide/";
    document.getElementsByTagName("head")[0].appendChild(script);
}
