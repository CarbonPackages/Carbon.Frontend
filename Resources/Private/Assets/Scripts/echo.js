import startWith from "./startWith";
import html from "./html";
// Avoid 'console' errors in browsers that lack a console and register own console called 'echo'

let echo = {};
const outputEcho = startWith(html.getAttribute("data-context"), "Development");
const noop = () => {};
const console = (window.console = window.console || {});
const methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeStamp",
    "trace",
    "warn"
];

methods.forEach(method => {
    // Stub undefined methods
    if (!console[method]) {
        console[method] = noop;
    }
    // Add function to own echo
    echo[method] = outputEcho ? console[method] : noop;
});

export default echo;
