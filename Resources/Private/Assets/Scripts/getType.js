import doesInclude from "./doesInclude";
import checkNaN from "./checkNaN";

const POSSIBLE_TYPES = "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
    " "
);

export default function(variable) {
    const TYPE = (typeof variable).toLowerCase();

    if (variable == null || checkNaN(variable, TYPE)) {
        return String(variable);
    } else if (TYPE === "object" || TYPE === "function") {
        let constructorType = variable.constructor.toString();
        for (let index in POSSIBLE_TYPES) {
            let possibleType = POSSIBLE_TYPES[index];
            if (doesInclude(constructorType, possibleType)) {
                if (checkNaN(variable, possibleType)) {
                    return String(variable);
                }
                return possibleType.toLowerCase();
            }
        }
        return "object";
    } else {
        return TYPE;
    }
}
