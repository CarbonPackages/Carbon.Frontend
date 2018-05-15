import camelCase from "./camelCase";
import evil from "./evil";
import getType from "./getType";

export default function(variable) {
    if (getType(variable) === "string") {
        try {
            variable = evil(variable);
        } catch (e) {
        } finally {
            return getType(variable) === "string"
                ? camelCase(variable)
                : variable;
        }
    } else {
        return variable;
    }
}
