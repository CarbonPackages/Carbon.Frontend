import toArray from "./toArray";

export default function(selector, context) {
    if (!context) {
        context = document;
    }
    return toArray(context.querySelectorAll(selector));
}
