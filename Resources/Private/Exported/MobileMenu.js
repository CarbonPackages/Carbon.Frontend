function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var gator = createCommonjsModule(function (module) {
  /**
   * Copyright 2014 Craig Campbell
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * GATOR.JS
   * Simple Event Delegation
   *
   * @version 1.2.4
   *
   * Compatible with IE 9+, FF 3.6+, Safari 5+, Chrome
   *
   * Include legacy.js for compatibility with older browsers
   *
   *             .-._   _ _ _ _ _ _ _ _
   *  .-''-.__.-'00  '-' ' ' ' ' ' ' ' '-.
   * '.___ '    .   .--_'-' '-' '-' _'-' '._
   *  V: V 'vv-'   '_   '.       .'  _..' '.'.
   *    '=.____.=_.--'   :_.__.__:_   '.   : :
   *            (((____.-'        '-.  /   : :
   *                              (((-'\ .' /
   *                            _____..'  .'
   *                           '-._____.-'
   */
  (function () {
    var _matcher,
        _level = 0,
        _id = 0,
        _handlers = {},
        _gatorInstances = {};

    function _addEvent(gator, type, callback) {
      // blur and focus do not bubble up but if you use event capturing
      // then you will get them
      var useCapture = type == 'blur' || type == 'focus';
      gator.element.addEventListener(type, callback, useCapture);
    }

    function _cancel(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    /**
     * returns function to use for determining if an element
     * matches a query selector
     *
     * @returns {Function}
     */


    function _getMatcher(element) {
      if (_matcher) {
        return _matcher;
      }

      if (element.matches) {
        _matcher = element.matches;
        return _matcher;
      }

      if (element.webkitMatchesSelector) {
        _matcher = element.webkitMatchesSelector;
        return _matcher;
      }

      if (element.mozMatchesSelector) {
        _matcher = element.mozMatchesSelector;
        return _matcher;
      }

      if (element.msMatchesSelector) {
        _matcher = element.msMatchesSelector;
        return _matcher;
      }

      if (element.oMatchesSelector) {
        _matcher = element.oMatchesSelector;
        return _matcher;
      } // if it doesn't match a native browser method
      // fall back to the gator function


      _matcher = Gator.matchesSelector;
      return _matcher;
    }
    /**
     * determines if the specified element matches a given selector
     *
     * @param {Node} element - the element to compare against the selector
     * @param {string} selector
     * @param {Node} boundElement - the element the listener was attached to
     * @returns {void|Node}
     */


    function _matchesSelector(element, selector, boundElement) {
      // no selector means this event was bound directly to this element
      if (selector == '_root') {
        return boundElement;
      } // if we have moved up to the element you bound the event to
      // then we have come too far


      if (element === boundElement) {
        return;
      } // if this is a match then we are done!


      if (_getMatcher(element).call(element, selector)) {
        return element;
      } // if this element did not match but has a parent we should try
      // going up the tree to see if any of the parent elements match
      // for example if you are looking for a click on an <a> tag but there
      // is a <span> inside of the a tag that it is the target,
      // it should still work


      if (element.parentNode) {
        _level++;
        return _matchesSelector(element.parentNode, selector, boundElement);
      }
    }

    function _addHandler(gator, event, selector, callback) {
      if (!_handlers[gator.id]) {
        _handlers[gator.id] = {};
      }

      if (!_handlers[gator.id][event]) {
        _handlers[gator.id][event] = {};
      }

      if (!_handlers[gator.id][event][selector]) {
        _handlers[gator.id][event][selector] = [];
      }

      _handlers[gator.id][event][selector].push(callback);
    }

    function _removeHandler(gator, event, selector, callback) {
      // if there are no events tied to this element at all
      // then don't do anything
      if (!_handlers[gator.id]) {
        return;
      } // if there is no event type specified then remove all events
      // example: Gator(element).off()


      if (!event) {
        for (var type in _handlers[gator.id]) {
          if (_handlers[gator.id].hasOwnProperty(type)) {
            _handlers[gator.id][type] = {};
          }
        }

        return;
      } // if no callback or selector is specified remove all events of this type
      // example: Gator(element).off('click')


      if (!callback && !selector) {
        _handlers[gator.id][event] = {};
        return;
      } // if a selector is specified but no callback remove all events
      // for this selector
      // example: Gator(element).off('click', '.sub-element')


      if (!callback) {
        delete _handlers[gator.id][event][selector];
        return;
      } // if we have specified an event type, selector, and callback then we
      // need to make sure there are callbacks tied to this selector to
      // begin with.  if there aren't then we can stop here


      if (!_handlers[gator.id][event][selector]) {
        return;
      } // if there are then loop through all the callbacks and if we find
      // one that matches remove it from the array


      for (var i = 0; i < _handlers[gator.id][event][selector].length; i++) {
        if (_handlers[gator.id][event][selector][i] === callback) {
          _handlers[gator.id][event][selector].splice(i, 1);

          break;
        }
      }
    }

    function _handleEvent(id, e, type) {
      if (!_handlers[id][type]) {
        return;
      }

      var target = e.target || e.srcElement,
          selector,
          match,
          matches = {},
          i = 0,
          j = 0; // find all events that match

      _level = 0;

      for (selector in _handlers[id][type]) {
        if (_handlers[id][type].hasOwnProperty(selector)) {
          match = _matchesSelector(target, selector, _gatorInstances[id].element);

          if (match && Gator.matchesEvent(type, _gatorInstances[id].element, match, selector == '_root', e)) {
            _level++;
            _handlers[id][type][selector].match = match;
            matches[_level] = _handlers[id][type][selector];
          }
        }
      } // stopPropagation() fails to set cancelBubble to true in Webkit
      // @see http://code.google.com/p/chromium/issues/detail?id=162270


      e.stopPropagation = function () {
        e.cancelBubble = true;
      };

      for (i = 0; i <= _level; i++) {
        if (matches[i]) {
          for (j = 0; j < matches[i].length; j++) {
            if (matches[i][j].call(matches[i].match, e) === false) {
              Gator.cancel(e);
              return;
            }

            if (e.cancelBubble) {
              return;
            }
          }
        }
      }
    }
    /**
     * binds the specified events to the element
     *
     * @param {string|Array} events
     * @param {string} selector
     * @param {Function} callback
     * @param {boolean=} remove
     * @returns {Object}
     */


    function _bind(events, selector, callback, remove) {
      // fail silently if you pass null or undefined as an alement
      // in the Gator constructor
      if (!this.element) {
        return;
      }

      if (!(events instanceof Array)) {
        events = [events];
      }

      if (!callback && typeof selector == 'function') {
        callback = selector;
        selector = '_root';
      }

      var id = this.id,
          i;

      function _getGlobalCallback(type) {
        return function (e) {
          _handleEvent(id, e, type);
        };
      }

      for (i = 0; i < events.length; i++) {
        if (remove) {
          _removeHandler(this, events[i], selector, callback);

          continue;
        }

        if (!_handlers[id] || !_handlers[id][events[i]]) {
          Gator.addEvent(this, events[i], _getGlobalCallback(events[i]));
        }

        _addHandler(this, events[i], selector, callback);
      }

      return this;
    }
    /**
     * Gator object constructor
     *
     * @param {Node} element
     */


    function Gator(element, id) {
      // called as function
      if (!(this instanceof Gator)) {
        // only keep one Gator instance per node to make sure that
        // we don't create a ton of new objects if you want to delegate
        // multiple events from the same node
        //
        // for example: Gator(document).on(...
        for (var key in _gatorInstances) {
          if (_gatorInstances[key].element === element) {
            return _gatorInstances[key];
          }
        }

        _id++;
        _gatorInstances[_id] = new Gator(element, _id);
        return _gatorInstances[_id];
      }

      this.element = element;
      this.id = id;
    }
    /**
     * adds an event
     *
     * @param {string|Array} events
     * @param {string} selector
     * @param {Function} callback
     * @returns {Object}
     */


    Gator.prototype.on = function (events, selector, callback) {
      return _bind.call(this, events, selector, callback);
    };
    /**
     * removes an event
     *
     * @param {string|Array} events
     * @param {string} selector
     * @param {Function} callback
     * @returns {Object}
     */


    Gator.prototype.off = function (events, selector, callback) {
      return _bind.call(this, events, selector, callback, true);
    };

    Gator.matchesSelector = function () {};

    Gator.cancel = _cancel;
    Gator.addEvent = _addEvent;

    Gator.matchesEvent = function () {
      return true;
    };

    if (module.exports) {
      module.exports = Gator;
    }

    window.Gator = Gator;
  })();
});

function domReady (callback) {
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

// https://github.com/jonathantneal/focus-within/blob/master/index.js
function focusWithin(document, opts) {
  const {
    className = "",
    attr = "focus-within",
    force
  } = Object(opts);
  const lastElements = [];

  try {
    document.querySelector(":focus-within");

    if (!force) {
      return initialize;
    }
  } catch (ignoredError) {
    /* do nothing */
  }

  function onfocuschange() {
    let lastElement;

    while (lastElement = lastElements.pop()) {
      if (attr) {
        lastElement.removeAttribute(attr);
      }

      if (className) {
        lastElement.classList.remove(className);
      }
    }

    let activeElement = document.activeElement; // only add focus if it has not been added and is not the document element

    if (!/^(#document|HTML|BODY)$/.test(Object(activeElement).nodeName)) {
      while (activeElement && activeElement.nodeType === 1) {
        if (attr) {
          activeElement.setAttribute(attr, "");
        }

        if (className) {
          activeElement.classList.add(className);
        }

        lastElements.push(activeElement);
        activeElement = activeElement.parentNode;
      }
    }
  }

  function initialize() {
    document.addEventListener("focus", onfocuschange, true);
    document.addEventListener("blur", onfocuschange, true);
  }
  /**
   * Callback wrapper for check loaded state
   */

  /* eslint-disable */


  !function load() {
    if (/m/.test(document.readyState)) {
      document.removeEventListener("readystatechange", load) | initialize();
    } else {
      document.addEventListener("readystatechange", load);
    }
  }();
  /* eslint-enable */

  return initialize;
}

function matches (element, selector) {
  if (!element || typeof selector != "string" || element.nodeType != 1) {
    console.warn("Wrong or missing arguments in function `matches`");
    return null;
  }

  return (element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.webkitMatchesSelector || element.oMatchesSelector).call(element, selector);
}

function isNode (element) {
  return element.nodeType == 1;
}

function bubbleUntil (element, selectorOrElement = document.documentElement, returnAll = false) {
  const IS_STRING = typeof selectorOrElement == "string";

  if (!element || element.nodeType != 1 || !IS_STRING && !isNode(selectorOrElement)) {
    console.warn("Wrong or missing arguments in function `bubbleUntil`");
    return null;
  }

  let elements = [element];

  while (IS_STRING ? !matches(element, selectorOrElement) : element != selectorOrElement) {
    element = element.parentNode;
    elements.push(element);

    if (!isNode(element)) {
      return false;
    }
  }

  return returnAll ? elements : element;
}

function toArray (arrayLikeObject) {
  return [].slice.call(arrayLikeObject);
}

function nodeArray (selector, context) {
  if (!context) {
    context = document;
  }

  return toArray(context.querySelectorAll(selector));
}

const DEFAULTS = {
  key: {
    tab: 9,
    escape: 27
  },
  selector: {
    header: ".page-header",
    navigation: ".mainnav",
    hamburger: ".hamburger-icon",
    openOnTap: ".mainnav__element--hassub > a.mainnav__link--level1",
    focusable: ["a[href]", "area[href]", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "iframe", "object", "embed", "[contenteditable]", "[tabindex]:not([tabindex^='-'])"].join(",")
  },
  menuOpen: "-menuopen",
  htmlElement: document.documentElement,
  isTouch: "ontouchstart" in document.documentElement,
  focusWithin: document
};
function mobileMenu ({
  selector = {},
  menuOpen = DEFAULTS.menuOpen,
  focusWithin: focusWithin$$1 = DEFAULTS.focusWithin,
  isTouch = DEFAULTS.isTouch,
  setTop = false
} = {}) {
  let select = Object.assign({}, DEFAULTS.selector, selector);
  let header;
  let navigation;
  let hamburger;
  let focusable = [];
  let focusableNav = [];
  let menuIsOpen = false;
  let submenuLinks = [];
  onReady();
  addGatorEvents();

  if (focusWithin$$1) {
    focusWithin(focusWithin$$1);
  }

  function onReady() {
    domReady(() => {
      if (document.body.classList.contains(menuOpen)) {
        menuIsOpen = true;
      }

      header = document.querySelector(select.header);

      if (header) {
        hamburger = header.querySelector(select.hamburger);
        navigation = header.querySelector(select.navigation);
        focusable = nodeArray(select.focusable, header);

        if (navigation) {
          focusableNav = nodeArray(select.focusable, navigation);

          if (select.openOnTap && isTouch) {
            submenuLinks = nodeArray(select.openOnTap, navigation);
          }
        }

        checkSize();
      }
    });
  }

  function addGatorEvents() {
    gator(window).on("resize", checkSize);
    gator(DEFAULTS.htmlElement).on("click", select.hamburger, function () {
      toggleMenu();
      this.blur();
    });

    if (select.openOnTap && isTouch) {
      gator(DEFAULTS.htmlElement).on("touchend", function (event) {
        if (!menuIsOpen) {
          let link = bubbleUntil(event.target, select.openOnTap);

          if (link) {
            if (!link.parentNode.classList.contains(cssClasses.focus)) {
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

  function checkSize() {
    if (hamburger) {
      let style = window.getComputedStyle(hamburger);

      if (style.display == "none" || style.opacity == "0" || style.visibility == "hidden") {
        hideMenu(false);
        setTabIndexFromNavigationElements(true);
      } else if (!document.body.classList.contains(menuOpen)) {
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
      if (event.which === DEFAULTS.key.escape) {
        event.preventDefault();
        hideMenu();
      } // If TAB key is being pressed, make sure the
      // focus stays trapped within the menu


      if (event.which === DEFAULTS.key.tab) {
        trapTabKey(event);
      }
    }
  }

  function trapTabKey(event) {
    let index = focusable.indexOf(document.activeElement); // If the SHIFT key is being pressed while tabbing (moving backwards) and
    // the currently focused item is the first one, move the focus to the last
    // focusable item from the menu

    if (event.shiftKey && index === 0) {
      focusable[focusable.length - 1].focus();
      event.preventDefault(); // If the SHIFT key is not being pressed (moving forwards) and the
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
      event = new CustomEvent(eventName, {
        detail: OPTIONS
      });
    } else {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventName, true, true, OPTIONS);
    }

    document.dispatchEvent(event);
  }

  function hideMenu(setIndex = true) {
    if (!menuIsOpen) {
      return;
    }

    menuIsOpen = false;

    if (setIndex) {
      setTabIndexFromNavigationElements(false);
    }

    DEFAULTS.htmlElement.classList.remove(menuOpen);
    document.body.classList.remove(menuOpen);

    if (setTop) {
      window.scrollTo(0, parseInt(document.body.style.top) * -1);
      document.body.style.top = "";
    } // Remove events


    try {
      gator(document.body).off("focus", maintainFocus);
    } catch (error) {}

    try {
      gator(document).off("keydown", bindKeypress);
    } catch (error) {}

    triggerEvent("mobileMenu.close");
  }

  function showMenu() {
    if (menuIsOpen) {
      return;
    }

    menuIsOpen = true;
    setTabIndexFromNavigationElements(true);

    if (setTop) {
      document.body.style.top = `-${window.pageYOffset}px`;
    }

    DEFAULTS.htmlElement.classList.add(menuOpen);
    document.body.classList.add(menuOpen); // Add events

    gator(document.body).on("focus", maintainFocus);
    gator(document).on("keydown", bindKeypress);
    triggerEvent("mobileMenu.open");
  }

  function toggleMenu() {
    return menuIsOpen ? hideMenu() : showMenu();
  }

  return {
    toggleMenu,
    showMenu,
    hideMenu,
    closeSubmenus,
    checkSize
  };
}

export { gator as Gator, domReady, mobileMenu };
