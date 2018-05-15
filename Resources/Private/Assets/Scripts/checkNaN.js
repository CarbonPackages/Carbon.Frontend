export default function(variable, type) {
    if (!variable) {
        return null;
    }

    if (!type) {
        type = (typeof variable).toLowerCase();
    }

    return type == "number" && isNaN(variable);
}
