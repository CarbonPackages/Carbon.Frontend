import doesInclude from "./doesInclude";

export default function() {
    const USER_AGENT = navigator.userAgent;
    const APP_VERSION = navigator.appVersion;

    let name = navigator.appName;
    let fullVersion = "" + parseFloat(APP_VERSION);
    let majorVersion = parseInt(APP_VERSION, 10);
    let nameOffset;
    let verOffset;
    let ix;
    let isIE = false;
    let isFirefox = false;
    let isChrome = false;
    let isSafari = false;

    if (
        doesInclude(APP_VERSION, "Windows NT") &&
        doesInclude(APP_VERSION, "rv:11")
    ) {
        // MSIE 11
        isIE = true;
        name = "IE";
        fullVersion = "11";
    } else if ((verOffset = USER_AGENT.indexOf("MSIE")) !== -1) {
        // MSIE
        isIE = true;
        name = "IE";
        fullVersion = USER_AGENT.substring(verOffset + 5);
    } else if ((verOffset = USER_AGENT.indexOf("Chrome")) !== -1) {
        // Chrome
        isChrome = true;
        name = "Chrome";
        fullVersion = USER_AGENT.substring(verOffset + 7);
    } else if ((verOffset = USER_AGENT.indexOf("Safari")) !== -1) {
        // Safari
        isSafari = true;
        name = "Safari";
        fullVersion = USER_AGENT.substring(verOffset + 7);
        if ((verOffset = USER_AGENT.indexOf("Version")) !== -1) {
            fullVersion = USER_AGENT.substring(verOffset + 8);
        }
    } else if ((verOffset = USER_AGENT.indexOf("Firefox")) !== -1) {
        // Firefox
        isFirefox = true;
        name = "Firefox";
        fullVersion = USER_AGENT.substring(verOffset + 8);
    } else if (
        (nameOffset = USER_AGENT.lastIndexOf(" ") + 1) <
        (verOffset = USER_AGENT.lastIndexOf("/"))
    ) {
        // In most other browsers, 'name/version' is at the end of userAgent
        name = USER_AGENT.substring(nameOffset, verOffset);
        fullVersion = USER_AGENT.substring(verOffset + 1);

        if (name.toLowerCase() === name.toUpperCase()) {
            name = navigator.appName;
        }
    }

    // Trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }
    if ((ix = fullVersion.indexOf(" ")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    // Get major version
    majorVersion = parseInt("" + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = "" + parseFloat(APP_VERSION);
        majorVersion = parseInt(APP_VERSION, 10);
    }

    // Return data
    return {
        name: name,
        version: majorVersion,
        isIE: isIE,
        isFirefox: isFirefox,
        isChrome: isChrome,
        isSafari: isSafari,
        isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform),
        isIphone: /(iPhone|iPod)/g.test(navigator.userAgent),
        isTouch: "ontouchstart" in document.documentElement
    };
}
