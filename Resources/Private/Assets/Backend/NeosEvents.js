export default function(events, callback) {
    // http://neos.readthedocs.io/en/stable/ExtendingNeos/InteractionWithTheNeosBackend.html
    let count = 0;
    if (typeof events === "string") {
        events = events.replace(/\s/g, "").split(",");
    }

    if (Array.isArray(events) && typeof callback === "function") {
        count = events.length;
        events.forEach(nameOfEvent => {
            document.addEventListener("Neos." + nameOfEvent, callback, false);
        });
    }

    return count + " Neos Event" + (count === 1 ? "" : "s") + " added.";
}
