export default function(node) {
    try {
        if (typeof node == "undefined") {
            node = document.body.getAttribute("data-neos-node") || false;
        }
        if (typeof node == "string") {
            sessionStorage.setItem("Neos.Neos.lastVisitedNode", node);
        }
    } catch (error) {}
}
