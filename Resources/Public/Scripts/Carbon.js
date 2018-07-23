/*!
 * Carbon.Frontend - created by Jon Uhlmann
 * @build 2018-07-23 17:20
 * @link https://github.com/CarbonPackages/Carbon.Frontend
 */
!function(){"use strict";var e=document.documentElement,n=document.documentElement.classList.contains("-live"),t=e.lang||"en",o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i={},r=function(e,n){var t=void 0===e?"undefined":o(e);if("undefined"==t||"string"!=t)return i;var r=i[e],u=void 0!==r,l=void 0!==n;return l&&!u?(i[e]=n,n):u?(l&&console.warn("A Carbon item with the key '"+e+"' already exist"),r):(console.warn("There is no Carbon item with the key '"+e+"'"),null)};Object.freeze(r),r("html",e),r("isLive",n),r("language",t),window.Carbon=r}();

//# sourceMappingURL=Carbon.js.map
