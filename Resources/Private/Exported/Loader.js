const html = document.documentElement;

// The html tag need the class "-live" in the live context
const isLive = document.documentElement.classList.contains("-live");

const language = html.lang || "en";

const _data = {};

const Carbon = function (key, item) {
  const TYPE_OF_KEY = typeof key;

  if (TYPE_OF_KEY == "undefined" || TYPE_OF_KEY != "string") {
    return _data;
  }

  const OBJ = _data[key];
  const HAS_OBJ = typeof OBJ != "undefined";
  const HAS_ITEM = typeof item != "undefined"; // Setter

  if (HAS_ITEM && !HAS_OBJ) {
    _data[key] = item;
    return item;
  } // Getter


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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var loadjs_umd = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    /**
     * Global dependencies.
     * @global {Object} document - DOM
     */
    var devnull = function () {},
        bundleIdCache = {},
        bundleResultCache = {},
        bundleCallbackQueue = {};
    /**
     * Subscribe to bundle load event.
     * @param {string[]} bundleIds - Bundle ids
     * @param {Function} callbackFn - The callback function
     */


    function subscribe(bundleIds, callbackFn) {
      // listify
      bundleIds = bundleIds.push ? bundleIds : [bundleIds];
      var depsNotFound = [],
          i = bundleIds.length,
          numWaiting = i,
          fn,
          bundleId,
          r,
          q; // define callback function

      fn = function (bundleId, pathsNotFound) {
        if (pathsNotFound.length) depsNotFound.push(bundleId);
        numWaiting--;
        if (!numWaiting) callbackFn(depsNotFound);
      }; // register callback


      while (i--) {
        bundleId = bundleIds[i]; // execute callback if in result cache

        r = bundleResultCache[bundleId];

        if (r) {
          fn(bundleId, r);
          continue;
        } // add to callback queue


        q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
        q.push(fn);
      }
    }
    /**
     * Publish bundle load event.
     * @param {string} bundleId - Bundle id
     * @param {string[]} pathsNotFound - List of files not found
     */


    function publish(bundleId, pathsNotFound) {
      // exit if id isn't defined
      if (!bundleId) return;
      var q = bundleCallbackQueue[bundleId]; // cache result

      bundleResultCache[bundleId] = pathsNotFound; // exit if queue is empty

      if (!q) return; // empty callback queue

      while (q.length) {
        q[0](bundleId, pathsNotFound);
        q.splice(0, 1);
      }
    }
    /**
     * Execute callbacks.
     * @param {Object or Function} args - The callback args
     * @param {string[]} depsNotFound - List of dependencies not found
     */


    function executeCallbacks(args, depsNotFound) {
      // accept function as argument
      if (args.call) args = {
        success: args
      }; // success and error callbacks

      if (depsNotFound.length) (args.error || devnull)(depsNotFound);else (args.success || devnull)(args);
    }
    /**
     * Load individual file.
     * @param {string} path - The file path
     * @param {Function} callbackFn - The callback function
     */


    function loadFile(path, callbackFn, args, numTries) {
      var doc = document,
          async = args.async,
          maxTries = (args.numRetries || 0) + 1,
          beforeCallbackFn = args.before || devnull,
          pathStripped = path.replace(/^(css|img)!/, ''),
          isCss,
          e;
      numTries = numTries || 0;

      if (/(^css!|\.css$)/.test(path)) {
        isCss = true; // css

        e = doc.createElement('link');
        e.rel = 'stylesheet';
        e.href = pathStripped; //.replace(/^css!/, '');  // remove "css!" prefix
      } else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
        // image
        e = doc.createElement('img');
        e.src = pathStripped;
      } else {
        // javascript
        e = doc.createElement('script');
        e.src = path;
        e.async = async === undefined ? true : async;
      }

      e.onload = e.onerror = e.onbeforeload = function (ev) {
        var result = ev.type[0]; // Note: The following code isolates IE using `hideFocus` and treats empty
        // stylesheets as failures to get around lack of onerror support

        if (isCss && 'hideFocus' in e) {
          try {
            if (!e.sheet.cssText.length) result = 'e';
          } catch (x) {
            // sheets objects created from load errors don't allow access to
            // `cssText` (unless error is Code:18 SecurityError)
            if (x.code != 18) result = 'e';
          }
        } // handle retries in case of load failure


        if (result == 'e') {
          // increment counter
          numTries += 1; // exit function and try again

          if (numTries < maxTries) {
            return loadFile(path, callbackFn, args, numTries);
          }
        } // execute callback


        callbackFn(path, result, ev.defaultPrevented);
      }; // add to document (unless callback returns `false`)


      if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
    }
    /**
     * Load multiple files.
     * @param {string[]} paths - The file paths
     * @param {Function} callbackFn - The callback function
     */


    function loadFiles(paths, callbackFn, args) {
      // listify paths
      paths = paths.push ? paths : [paths];
      var numWaiting = paths.length,
          x = numWaiting,
          pathsNotFound = [],
          fn,
          i; // define callback function

      fn = function (path, result, defaultPrevented) {
        // handle error
        if (result == 'e') pathsNotFound.push(path); // handle beforeload event. If defaultPrevented then that means the load
        // will be blocked (ex. Ghostery/ABP on Safari)

        if (result == 'b') {
          if (defaultPrevented) pathsNotFound.push(path);else return;
        }

        numWaiting--;
        if (!numWaiting) callbackFn(pathsNotFound);
      }; // load scripts


      for (i = 0; i < x; i++) loadFile(paths[i], fn, args);
    }
    /**
     * Initiate script load and register bundle.
     * @param {(string|string[])} paths - The file paths
     * @param {(string|Function)} [arg1] - The bundleId or success callback
     * @param {Function} [arg2] - The success or error callback
     * @param {Function} [arg3] - The error callback
     */


    function loadjs(paths, arg1, arg2) {
      var bundleId, args; // bundleId (if string)

      if (arg1 && arg1.trim) bundleId = arg1; // args (default is {})

      args = (bundleId ? arg2 : arg1) || {}; // throw error if bundle is already defined

      if (bundleId) {
        if (bundleId in bundleIdCache) {
          throw "LoadJS";
        } else {
          bundleIdCache[bundleId] = true;
        }
      } // load scripts


      loadFiles(paths, function (pathsNotFound) {
        // execute callbacks
        executeCallbacks(args, pathsNotFound); // publish bundle load event

        publish(bundleId, pathsNotFound);
      }, args);
    }
    /**
     * Execute callbacks when dependencies have been satisfied.
     * @param {(string|string[])} deps - List of bundle ids
     * @param {Object} args - success/error arguments
     */


    loadjs.ready = function ready(deps, args) {
      // subscribe to bundle load event
      subscribe(deps, function (depsNotFound) {
        // execute callbacks
        executeCallbacks(args, depsNotFound);
      });
      return loadjs;
    };
    /**
     * Manually satisfy bundle dependencies.
     * @param {string} bundleId - The bundle id
     */


    loadjs.done = function done(bundleId) {
      publish(bundleId, []);
    };
    /**
     * Reset loadjs dependencies statuses
     */


    loadjs.reset = function reset() {
      bundleIdCache = {};
      bundleResultCache = {};
      bundleCallbackQueue = {};
    };
    /**
     * Determine if bundle has already been defined
     * @param String} bundleId - The bundle id
     */


    loadjs.isDefined = function isDefined(bundleId) {
      return bundleId in bundleIdCache;
    }; // export


    return loadjs;
  });
});

function endWith (test, value) {
  return test.indexOf(value, test.length - value.length) != -1;
}

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
} // Store domReady on global object


Carbon("domReady", domReady); // Implement a require-like dependency manager
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
    if (!loadjs_umd.isDefined(id)) {
      loadjs_umd(Carbon("Bundles")[id], id, {
        async: async
      });
    }
  });

  if (typeof callback == "function") {
    loadjs_umd.ready(ids, callback);
  }
}

Carbon("SyncRequire", (ids, callback) => {
  require(ids, callback, false);
});
Carbon("Require", (ids, callback) => {
  require(ids, callback, true);
});

function detectIE() {
  let ua = window.navigator.userAgent; // Test values; Uncomment to check result …
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
  } // other browser


  return false;
}

export { Carbon, polyfill, domReady };
