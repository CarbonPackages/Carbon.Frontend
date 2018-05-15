import matches from "./matches";
import isNode from "./isNode";

export default function(
    element,
    selectorOrElement = document.documentElement,
    returnAll = false
) {
    const IS_STRING = typeof selectorOrElement == "string";

    if (
        !element ||
        element.nodeType != 1 ||
        (!IS_STRING && !isNode(selectorOrElement))
    ) {
        console.warn("Wrong or missing arguments in function `bubbleUntil`");
        return null;
    }

    let elements = [element];

    while (
        IS_STRING
            ? !matches(element, selectorOrElement)
            : element != selectorOrElement
    ) {
        element = element.parentNode;
        elements.push(element);
        if (!isNode(element)) {
            return false;
        }
    }
    return returnAll ? elements : element;
}
