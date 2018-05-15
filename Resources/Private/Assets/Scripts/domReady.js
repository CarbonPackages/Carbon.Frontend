export default function(callback) {
    let firstRun = true;

    function runCallback(event) {
        if (firstRun) {
            if (typeof callback == "function") {
                callback(event);
            }
            firstRun = false;
        }
    }

    if (document.readyState == "loading") {
        document.addEventListener("readystatechange", runCallback);
    } else {
        runCallback();
    }
}
