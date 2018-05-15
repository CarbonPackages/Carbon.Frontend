export default function(element, selector) {
    if (!element || typeof selector != "string" || element.nodeType != 1) {
        console.warn("Wrong or missing arguments in function `matches`");
        return null;
    }
    return (
        element.matches ||
        element.matchesSelector ||
        element.msMatchesSelector ||
        element.mozMatchesSelector ||
        element.webkitMatchesSelector ||
        element.oMatchesSelector
    ).call(element, selector);
}
