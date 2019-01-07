const IS_NEW_UI = !!(window.name == "neos-content-main");
const SITE_DOC = window.document;
const HTML_CLASS_LIST = SITE_DOC.documentElement.classList;
const NEOS_DOC = IS_NEW_UI ? window.parent.document : SITE_DOC;
const NAMESPACE = "__carbonbuttoncontextbar";
const ICONS_BASE = `style="fill:#fff" class="neos-svg-inline--fa neos-fa-image fa-w-18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"`;
const ICONS = {
    images: `<svg ${ICONS_BASE} viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z"/></svg>`,
    ellipsis: `<svg ${ICONS_BASE} viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg>`,
    arrows: `<svg ${ICONS_BASE} viewBox="0 0 512 512"><path d="M377.941 169.941V216H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.568 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296h243.882v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.568 0-33.941l-86.059-86.059c-15.119-15.12-40.971-4.412-40.971 16.97z"/></svg>`,
    camera: `<svg ${ICONS_BASE} viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/></svg>`
};

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

function setButtonState(button, activeState = isActiveState()) {
    if (button) {
        button.style.background = activeState ? "#00adee" : "transparent";
    }
}

function isActiveState() {
    return HTML_CLASS_LIST.contains(settings.toggleClass);
}

function addButton() {
    if (
        !NEOS_DOC.querySelector(
            `button.${NAMESPACE}.${
                settings.className
            }[title="${settings.title.replace(/' '/, " ")}"]`
        )
    ) {
        let button = NEOS_DOC.createElement("button");
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
            let activeState = isActiveState();
            button.blur();
            triggerButton(button, activeState);

            if (!activeState && typeof settings.onActive == "function") {
                settings.onActive();
            }
            if (activeState && typeof settings.onInactive == "function") {
                settings.onInactive();
            }
        };
        button.innerHTML =
            settings.icon in ICONS ? ICONS[settings.icon] : settings.icon;
        element.insertBefore(button, element.firstChild);

        if (NEOS_DOC[NAMESPACE][settings.toggleClass]) {
            // Set active state
            HTML_CLASS_LIST.add(settings.toggleClass);
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
        : element
        ? element.querySelector(`.${settings.className}`)
        : false;
    if (button) {
        callback(button);
    }
}

function triggerButton(button) {
    HTML_CLASS_LIST.toggle(settings.toggleClass);

    // Save the state
    activeHref = location.href;
    NEOS_DOC[NAMESPACE][settings.toggleClass] = HTML_CLASS_LIST.contains(
        settings.toggleClass
    );

    buttonCallback(button, setButtonState);
}

function removeButton(button) {
    buttonCallback(button, button => {
        button.parentElement.removeChild(button);
    });

    HTML_CLASS_LIST.remove(settings.toggleClass);
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
