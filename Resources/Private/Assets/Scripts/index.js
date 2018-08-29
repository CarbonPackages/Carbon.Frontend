import html from "./html";
import isLive from "./isLive";
import language from "./language";

// Create Singleton
const _data = {};
const Carbon = function(key, item) {
    const TYPE_OF_KEY = typeof key;
    if (TYPE_OF_KEY == "undefined" || TYPE_OF_KEY != "string") {
        return _data;
    }
    const OBJ = _data[key];
    const HAS_OBJ = typeof OBJ != "undefined";
    const HAS_ITEM = typeof item != "undefined";

    // Setter
    if (HAS_ITEM && !HAS_OBJ) {
        _data[key] = item;
        return item;
    }

    // Getter
    if (HAS_OBJ) {
        if (HAS_ITEM) {
            console.warn(`A Carbon item with the key '${key}' already exist`);
        }
        return OBJ;
    }
    return null;
};
Object.freeze(Carbon);

Carbon("html", html);
Carbon("isLive", isLive);
Carbon("language", language);

export default Carbon;
