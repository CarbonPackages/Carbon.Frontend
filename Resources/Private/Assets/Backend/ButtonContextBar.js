const IS_NEW_UI = !!(window.name == "neos-content-main");
const SITE_DOC = window.document;
const NEOS_DOC = IS_NEW_UI ? window.parent.document : SITE_DOC;
const NAMESPACE = "__ggbuttoncontextbar";

let element = null;
let settings = null;
let activeHref = null;

// Prepare to save the state
if (typeof NEOS_DOC[NAMESPACE] == "undefined") {
    NEOS_DOC[NAMESPACE] = {};
}

function oldUiIsLoaded() {
    return NEOS_DOC.getElementById("neos-context-bar");
}

function recallSetElement(callback) {
    setTimeout(() => {
        setElement(callback);
    }, 100);
}

function setElement(callback) {
    try {
        if (IS_NEW_UI) {
            element = NEOS_DOC.querySelector("[target=neosPreview]")
                .parentElement;
        } else if (oldUiIsLoaded()) {
            element = NEOS_DOC.querySelector("#neos-context-bar>.neos-right");
        } else {
            recallSetElement(callback);
        }
    } catch (error) {
        recallSetElement(callback);
    } finally {
        if (element && typeof callback == "function") {
            setTimeout(callback, 100);
        }
    }
}

function setButtonState(
    button,
    state = SITE_DOC.body.classList.contains(settings.toggleClass)
) {
    if (button) {
        button.style.background = state ? "#00adee" : "transparent";
    }
}

function addButton() {
    if (
        !NEOS_DOC.querySelector(
            `button.${NAMESPACE}.${settings.className}[title=${settings.title}]`
        )
    ) {
        let button = NEOS_DOC.createElement("button");
        let bodyClassList = SITE_DOC.body.classList;
        button.className = `${NAMESPACE} ${settings.className}`;
        button.type = "button";
        button.title = settings.title;
        Object.assign(button.style, {
            position: "relative",
            outline: "none",
            float: "left",
            display: "inline-block",
            height: "40px",
            minWidth: "40px",
            padding: 0,
            border: 0,
            verticalAlign: "top",
            width: "40px",
            color: "#fff",
            cursor: "pointer",
            background: "transparent",
            font: "normal normal normal 14px/1 FontAwesome",
            textRendering: "auto",
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale"
        });
        button.onmouseover = () => {
            setButtonState(button, true);
        };
        button.onmouseout = () => {
            setButtonState(button);
        };
        button.onclick = () => {
            button.blur();
            triggerButton(button);
        };
        button.innerHTML = `&#x${settings.icon};`;
        element.insertBefore(button, element.firstChild);

        if (NEOS_DOC[NAMESPACE][settings.toggleClass]) {
            // Set active state
            SITE_DOC.body.classList.add(settings.toggleClass);
            setButtonState(button, true);
        }
        window.onunload = () => {
            if (activeHref != location.href) {
                removeButton(button);
            } else {
                button.parentElement.removeChild(button);
            }
        };
    }
}

function buttonCallback(button, callback) {
    button = button
        ? button
        : element ? element.querySelector(`.${settings.className}`) : false;
    if (button) {
        callback(button);
    }
}

function triggerButton(button) {
    let classList = SITE_DOC.body.classList;
    classList.toggle(settings.toggleClass);

    // Save the state
    activeHref = location.href;
    NEOS_DOC[NAMESPACE][settings.toggleClass] = classList.contains(
        settings.toggleClass
    );

    buttonCallback(button, setButtonState);
}

function removeButton(button) {
    buttonCallback(button, button => {
        console.log(button);
        button.parentElement.removeChild(button);
    });

    SITE_DOC.body.classList.remove(settings.toggleClass);
    NEOS_DOC[NAMESPACE][settings.toggleClass] = false;
}

const ButtonContextBar = {
    add: options => {
        if (
            options.className &&
            options.icon &&
            options.title &&
            options.toggleClass
        ) {
            settings = Object.assign({}, options);
            setElement(addButton);
        }
    },
    remove: options => {
        if (options.className && options.toggleClass) {
            settings = Object.assign({}, options);
            setElement(removeButton);
        }
    },
    toggle: options => {
        if (
            options.className &&
            options.icon &&
            options.title &&
            options.toggleClass
        ) {
            settings = Object.assign({}, options);
            if (typeof options.check == "function") {
                settings.check = options.check();
            }
            setElement(!!settings.check ? addButton : removeButton);
        }
    },
    trigger: options => {
        if (options.className && options.toggleClass) {
            settings = options;
            setElement(triggerButton);
        }
    }
};

export default ButtonContextBar;
