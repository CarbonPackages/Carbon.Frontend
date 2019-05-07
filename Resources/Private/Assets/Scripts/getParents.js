import checkMatch from "./checkMatch";

export default function(element, selector, topElement) {
    let parents = [];

    // If the element is not set or not a node return empty array
    if (!element || element.nodeType != 1) {
        return parents;
    }

    // If the top element is not set or not a node set it to document
    if (!topElement || topElement.nodeType != 1) {
        topElement = document;
    }
    let parentElement = element.parentNode;
    while (parentElement !== topElement) {
        if (checkMatch(parentElement, selector)) {
            parents.push(parentElement);
        }
        parentElement = parentElement.parentNode;
    }
    if (checkMatch(parentElement, selector)) {
        parents.push(parentElement);
    }

    return parents;
}
