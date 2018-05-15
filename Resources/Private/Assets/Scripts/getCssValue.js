import isNode from "./isNode";

export default function(selector, property) {
    if (typeof selector == "string") {
        selector = document.querySelector(selector);
    }
    if (!selector && !isNode(selector)) {
        throw "Please set a string or a html element as first value";
    }
    if (typeof property != "string") {
        throw "Please set a string for the css property as second value";
    }
    return getComputedStyle(selector).getPropertyValue(property);
}
