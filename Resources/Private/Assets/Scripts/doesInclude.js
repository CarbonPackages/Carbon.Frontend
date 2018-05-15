export default function(test, value) {
    if (!test) {
        return null;
    }
    return !!~test.indexOf(value);
}
