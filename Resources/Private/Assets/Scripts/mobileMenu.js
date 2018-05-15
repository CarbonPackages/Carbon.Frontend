import Gator from "gator";
import domReady from "./domReady";
import focusWithin from "./focusWithin";
import bubbleUntil from "./bubbleUntil";

const KEY = {
    tab: 9,
    escape: 27
};

const DEFAULT_SELECTOR = {
    header: ".page-header",
    navigation: ".page-navigation",
    hamburger: ".hamburger-icon",
    focusable: [
        "a[href]",
        "area[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "button:not([disabled])",
        "iframe",
        "object",
        "embed",
        "[contenteditable]",
        "[tabindex]:not([tabindex^='-'])"
    ].join(","),
    openOnTap: ".nav-element.-hassub > a.nav-link.-level1"
};

const DEFAULT_CLASSES = {
    focus: "focus-within",
    menuOpen: "-menuopen"
};

const HTML_ELEMENT = document.documentElement;
const IS_TOUCH = "ontouchstart" in HTML_ELEMENT;

export default function({ selector = {}, classes = {} } = {}) {
    let select = Object.assign({}, DEFAULT_SELECTOR, selector);
    let cssClasses = Object.assign({}, DEFAULT_CLASSES, classes);
    let header;
    let navigation;
    let hamburger;
    let focusable = [];
    let focusableNav = [];
    let menuIsOpen = false;
    let submenuLinks = [];

    onReady();
    addGatorEvents();

    if (cssClasses.focus) {
        focusWithin(cssClasses.focus);
    }

    function onReady() {
        domReady(() => {
            if (document.body.classList.contains(cssClasses.menuOpen)) {
                menuIsOpen = true;
            }
            header = document.querySelector(select.header);

            if (header) {
                hamburger = header.querySelector(select.hamburger);
                navigation = header.querySelector(select.navigation);
                focusable = [...header.querySelectorAll(select.focusable)];
                if (navigation) {
                    focusableNav = [
                        ...navigation.querySelectorAll(select.focusable)
                    ];

                    if (select.openOnTap && cssClasses.focus && IS_TOUCH) {
                        submenuLinks = [
                            ...navigation.querySelectorAll(select.openOnTap)
                        ];
                    }
                }
                checkSize();
            }
        });
    }

    function addGatorEvents() {
        Gator(window).on("resize", checkSize);
        Gator(HTML_ELEMENT).on("click", select.hamburger, function() {
            toggleMenu();
            this.blur();
        });

        if (select.openOnTap && cssClasses.focus && IS_TOUCH) {
            Gator(HTML_ELEMENT).on("touchend", function(event) {
                if (!menuIsOpen) {
                    let link = bubbleUntil(event.target, select.openOnTap);
                    if (link) {
                        if (
                            !link.parentNode.classList.contains(
                                cssClasses.focus
                            )
                        ) {
                            event.preventDefault();
                            event.stopPropagation();
                            closeSubmenus();
                            setTimeout(() => {
                                link.focus();
                            }, 0);
                        }
                    } else {
                        closeSubmenus();
                    }
                }
            });
        }
    }

    function closeSubmenus() {
        submenuLinks.forEach(link => {
            link.blur();
        });
    }

    function navEvent(event) {
        if (checkElement(event.target) && (IS_TOUCH || checkMobileView())) {
            if (!$(event.target.parentNode).hasClass("nav-open")) {
                event.preventDefault();
                event.stopPropagation();
                closeNav();
                setTimeout(() => {
                    $(event.target.parentNode).addClass(OPEN_CLASS);
                }, 0);
            }
        } else {
            $subMenus.removeClass(OPEN_CLASS);
        }
    }

    function checkSize() {
        if (hamburger) {
            let style = window.getComputedStyle(hamburger);
            if (
                style.display == "none" ||
                style.opacity == "0" ||
                style.visibility == "hidden"
            ) {
                hideMenu(false);
                setTabIndexFromNavigationElements(true);
            } else if (!document.body.classList.contains(cssClasses.menuOpen)) {
                setTabIndexFromNavigationElements(false);
            }
        }
    }

    function setTabIndexFromNavigationElements(enable) {
        focusableNav.forEach(element => {
            element.tabIndex = enable ? 0 : -1;
        });
    }

    function maintainFocus(event) {
        // If the menu is shown and the focus is not within the header,
        // move it back to its first focusable child
        if (menuIsOpen && !header.contains(event.target) && focusable.length) {
            focusable[0].focus();
        }
    }

    function bindKeypress(event) {
        if (menuIsOpen) {
            // If ESCAPE key is being pressed, prevent any further
            // effects from the ESCAPE key and hide the Menu

            if (event.which === KEY.escape) {
                event.preventDefault();
                hideMenu();
            }

            // If TAB key is being pressed, make sure the
            // focus stays trapped within the menu
            if (event.which === KEY.tab) {
                trapTabKey(event);
            }
        }
    }

    function trapTabKey(event) {
        let index = focusable.indexOf(document.activeElement);

        // If the SHIFT key is being pressed while tabbing (moving backwards) and
        // the currently focused item is the first one, move the focus to the last
        // focusable item from the menu
        if (event.shiftKey && index === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();

            // If the SHIFT key is not being pressed (moving forwards) and the
            // currently focused item is the last one, move the focus to the
            // first focusable item from the menu
        } else if (!event.shiftKey && index === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
        }
    }

    function triggerEvent(eventName) {
        let event;
        const OPTIONS = {
            header: header,
            hamburger: hamburger,
            navigation: navigation,
            focusable: focusable,
            focusableNav: focusableNav,
            select: select
        };
        if (window.CustomEvent) {
            event = new CustomEvent(eventName, { detail: OPTIONS });
        } else {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventName, true, true, OPTIONS);
        }
        document.dispatchEvent(event);
    }

    function hideMenu(setIndex = true) {
        menuIsOpen = false;
        if (setIndex) {
            setTabIndexFromNavigationElements(false);
        }
        document.body.classList.remove(cssClasses.menuOpen);
        window.scrollTo(0, parseInt(document.body.style.top) * -1);
        document.body.style.top = "";

        // Remove events
        try {
            Gator(document.body).off("focus", maintainFocus);
        } catch (error) {}
        try {
            Gator(document).off("keydown", bindKeypress);
        } catch (error) {}

        triggerEvent("mobileMenu.close");
    }

    function showMenu() {
        menuIsOpen = true;

        setTabIndexFromNavigationElements(true);
        document.body.style.top = `-${window.pageYOffset}px`;
        document.body.classList.add(cssClasses.menuOpen);

        // Add events
        Gator(document.body).on("focus", maintainFocus);
        Gator(document).on("keydown", bindKeypress);

        triggerEvent("mobileMenu.open");
    }

    function toggleMenu() {
        return menuIsOpen ? hideMenu() : showMenu();
    }
}
