/*!
 * Carbon.Frontend - created by Jon Uhlmann
 * @build 2018-06-04 12:22
 * @link https://github.com/CarbonPackages/Carbon.Frontend
 */
!function(){"use strict";var n=document.documentElement,e=!document.body.classList.contains("neos-backend"),o=n.lang||"en",t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},i={},r=function(n,e){var o=void 0===n?"undefined":t(n);if("undefined"==o||"string"!=o)return i;var r=i[n],u=void 0!==r,c=void 0!==e;return c&&!u?(i[n]=e,e):u?(c&&console.warn("A Carbon item with the key '"+n+"' already exist"),r):(console.warn("There is no Carbon item with the key '"+n+"'"),null)};Object.freeze(r),r("html",n),r("isLive",e),r("language",o),window.Carbon=r}();

//# sourceMappingURL=Carbon.js.map
