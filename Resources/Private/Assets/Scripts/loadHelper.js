import Carbon from "./index";
import loadjs from "../LoadJS";
import endWith from "./endWith";
import domReady from "./domReady";

let dataBust = document.documentElement.dataset.bust;
const BASE = "/_Resources/Static/Packages/";
const BUST = `?v=${dataBust || "1"}`;

let ie = detectIE();
if (ie) {
    document.documentElement.classList.add(`-oldie`);
    document.documentElement.classList.add(`-oldie-${ie}`);
}

const POLYFILL_SHORTCUTS = {
    picture: "HTMLPictureElement"
};

function polyfill(features) {
    let url = "//cdn.polyfill.io/v2/polyfill.min.js";
    if (!features) {
        return url;
    }
    if (typeof features == "string") {
        features = features.split(",");
    }
    let array = [];
    features.forEach(feature => {
        if (POLYFILL_SHORTCUTS.hasOwnProperty(feature)) {
            feature = POLYFILL_SHORTCUTS[feature];
        }
        array.push(feature);
    });
    url += `?features=${array.join(",")}`;
    return url;
}

function getPaths(folder, filenames) {
    const PACKAGE = `${BASE}${folder}/`;
    let paths = [];
    filenames.split("||").forEach(filename => {
        if (endWith(filename, ".js")) {
            paths.push(`${PACKAGE}Scripts/${filename}${BUST}`);
        } else if (endWith(filename, ".css")) {
            paths.push(`css!${PACKAGE}Styles/${filename}${BUST}`);
        } else {
            paths.push(`${PACKAGE}Assets/${filename}`);
        }
    });
    return paths;
}

// Store domReady on global object
Carbon("domReady", domReady);

// Implement a require-like dependency manager

// Register Bundle:
// Carbon("AddBundle")("id", "Package.Name##Main.css||Main.js");
// Carbon("AddBundle")("external", "//path.com/Main.css||//path.com/Main.js"):
// Carbon("AddBundle")("mixed", ["//path.com/Main.css"||"Package.Name##Main.css||Main.js"]):

// Require
// Carbon("Require")("bundleA"); // Load only bundle, without callback
// Carbon("Require")("bundleA", () => { /* bundleA loaded */ });
// Carbon("Require")("bundleB", () => { /* bundleB loaded */ });
// Carbon("Require")("bundleA,bundleB", () => { /* bundleA and bundleB loaded */ });
// Carbon("Require")(["bundleA", "bundleB"], () => { /* bundleA and bundleB loaded */ });

// SyncRequire can be used to load the files in synchronous mode
// Carbon("SyncRequire")("bundleA,bundleB", () => { /* bundleA loaded */ });

Carbon("Bundles", {});
Carbon("AddBundle", (id, entries) => {
    let files = [];
    (typeof entries == "string" ? [entries] : entries).forEach(entry => {
        let paths = entry.split("##");
        if (paths.length > 1) {
            files.push(...getPaths(paths[0], paths[1]));
        } else {
            files.push(...entry.split("||"));
        }
    });

    Carbon("Bundles")[id] = files;
});

function require(ids, callback, async = true) {
    (typeof ids == "string" ? ids.split(",") : ids).forEach(id => {
        if (!loadjs.isDefined(id)) {
            loadjs(Carbon("Bundles")[id], id, {
                async: async
            });
        }
    });
    if (typeof callback == "function") {
        loadjs.ready(ids, callback);
    }
}

Carbon("SyncRequire", (ids, callback) => {
    require(ids, callback, false);
});
Carbon("Require", (ids, callback) => {
    require(ids, callback, true);
});

function detectIE() {
    let ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    var edge = ua.indexOf("Edge/");
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // other browser
    return false;
}

export { Carbon, polyfill, domReady };
