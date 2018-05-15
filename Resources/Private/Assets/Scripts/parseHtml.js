export default function(string) {
    let fragment = document.implementation.createHTMLDocument("");
    let base = fragment.createElement("base");
    base.href = document.location.href;
    fragment.head.appendChild(base);
    fragment.body.innerHTML = string.trim();

    return fragment.body.childNodes;
}
