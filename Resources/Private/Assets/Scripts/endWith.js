export default function(test, value) {
    return test.indexOf(value, test.length - value.length) != -1;
}
