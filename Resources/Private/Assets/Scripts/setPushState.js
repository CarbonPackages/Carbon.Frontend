export default function(options) {
    if (!options) {
        options = {};
    }
    if (!options.url) {
        options.url = location.pathname;
    }
    if (typeof options.hash === "string") {
        options.url += "#" + options.hash;
    } else {
        options.hash = null;
    }
    if (!options.data) {
        options.data = null;
    }
    if (options.title) {
        document.title = options.title;
    } else {
        options.title = null;
    }
    history.pushState(options.data, options.title, options.url);
    return options;
}
