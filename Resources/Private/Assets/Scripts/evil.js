export default function(fn) {
    return new Function("return " + fn)();
}
