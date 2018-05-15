/*!
 * Carbon.Frontend - created by Jon Uhlmann
 * @build 2018-05-15 13:49
 * @link https://github.com/jonnitto/Carbon.Frontend
 */
!function(){"use strict";var e=document.documentElement,t=!document.body.classList.contains("neos-backend"),o=e.lang||"en";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i={},r=function(e,t){var o=void 0===e?"undefined":n(e);if("undefined"==o||"string"!=o)return i;var r=i[e],s=void 0!==r,a=void 0!==t;return a&&!s?(i[e]=t,t):s?(a&&console.warn("A Carbon item with the key '"+e+"' already exist"),r):(console.warn("There is no Carbon item with the key '"+e+"'"),null)};Object.freeze(r),r("html",e),r("isLive",t),r("language",o),r("lastVisitedNode",function(e){try{void 0===e&&(e=document.body.getAttribute("data-neos-node")||!1),"string"==typeof e&&sessionStorage.setItem("Neos.Neos.lastVisitedNode",e)}catch(e){}}),window.Carbon=r}();

//# sourceMappingURL=Carbon.js.map
