/*!
 * Carbon.Frontend - created by Jon Uhlmann
 * @build 2018-06-04 12:22
 * @link https://github.com/CarbonPackages/Carbon.Frontend
 */
!function(){"use strict";var e,t=(function(e){!function(){var t,n=0,o=0,i={},c={};function a(e,o,i){return"_root"==o?i:e!==i?function(e){return t||(t=e.matches?e.matches:e.webkitMatchesSelector?e.webkitMatchesSelector:e.mozMatchesSelector?e.mozMatchesSelector:e.msMatchesSelector?e.msMatchesSelector:e.oMatchesSelector?e.oMatchesSelector:l.matchesSelector)}(e).call(e,o)?e:e.parentNode?(n++,a(e.parentNode,o,i)):void 0:void 0}function r(e,t,n,o){i[e.id]||(i[e.id]={}),i[e.id][t]||(i[e.id][t]={}),i[e.id][t][n]||(i[e.id][t][n]=[]),i[e.id][t][n].push(o)}function s(e,t,n,o){if(i[e.id])if(t)if(o||n)if(o){if(i[e.id][t][n])for(var c=0;c<i[e.id][t][n].length;c++)if(i[e.id][t][n][c]===o){i[e.id][t][n].splice(c,1);break}}else delete i[e.id][t][n];else i[e.id][t]={};else for(var a in i[e.id])i[e.id].hasOwnProperty(a)&&(i[e.id][a]={})}function u(e,t,o,u){if(this.element){e instanceof Array||(e=[e]),o||"function"!=typeof t||(o=t,t="_root");var f,d=this.id;for(f=0;f<e.length;f++)u?s(this,e[f],t,o):(i[d]&&i[d][e[f]]||l.addEvent(this,e[f],m(e[f])),r(this,e[f],t,o));return this}function m(e){return function(t){!function(e,t,o){if(i[e][o]){var r,s,u=t.target||t.srcElement,f={},d=0,m=0;for(r in n=0,i[e][o])i[e][o].hasOwnProperty(r)&&(s=a(u,r,c[e].element))&&l.matchesEvent(o,c[e].element,s,"_root"==r,t)&&(n++,i[e][o][r].match=s,f[n]=i[e][o][r]);for(t.stopPropagation=function(){t.cancelBubble=!0},d=0;d<=n;d++)if(f[d])for(m=0;m<f[d].length;m++){if(!1===f[d][m].call(f[d].match,t))return void l.cancel(t);if(t.cancelBubble)return}}}(d,t,e)}}}function l(e,t){if(!(this instanceof l)){for(var n in c)if(c[n].element===e)return c[n];return c[++o]=new l(e,o),c[o]}this.element=e,this.id=t}l.prototype.on=function(e,t,n){return u.call(this,e,t,n)},l.prototype.off=function(e,t,n){return u.call(this,e,t,n,!0)},l.matchesSelector=function(){},l.cancel=function(e){e.preventDefault(),e.stopPropagation()},l.addEvent=function(e,t,n){var o="blur"==t||"focus"==t;e.element.addEventListener(t,n,o)},l.matchesEvent=function(){return!0},e.exports&&(e.exports=l),window.Gator=l}()}(e={exports:{}},e.exports),e.exports);var n=window,o=n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||n.msRequestAnimationFrame||n.oRequestAnimationFrame||function(e){n.setTimeout(e,1e3/60)},i=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)};function c(e,t){return e&&"string"==typeof t&&1==e.nodeType?(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t):(console.warn("Wrong or missing arguments in function `matches`"),null)}function a(e){return 1==e.nodeType}var r={tab:9,escape:27},s={header:".page-header",navigation:".page-navigation",hamburger:".hamburger-icon",focusable:["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]","[tabindex]:not([tabindex^='-'])"].join(","),openOnTap:".nav-element.-hassub > a.nav-link.-level1"},u={focus:"focus-within",menuOpen:"-menuopen"},l=document.documentElement,f="ontouchstart"in l;!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.selector,d=void 0===n?{}:n,m=e.classes,h=void 0===m?{}:m,p=Object.assign({},s,d),v=Object.assign({},u,h),b=void 0,y=void 0,g=void 0,w=[],S=[],E=!1,O=[];function M(){O.forEach(function(e){e.blur()})}function A(){if(g){var e=window.getComputedStyle(g);"none"==e.display||"0"==e.opacity||"hidden"==e.visibility?(k(!1),q(!0)):document.body.classList.contains(v.menuOpen)||q(!1)}}function q(e){S.forEach(function(t){t.tabIndex=e?0:-1})}function x(e){E&&!b.contains(e.target)&&w.length&&w[0].focus()}function T(e){E&&(e.which===r.escape&&(e.preventDefault(),k()),e.which===r.tab&&function(e){var t=w.indexOf(document.activeElement);e.shiftKey&&0===t?(w[w.length-1].focus(),e.preventDefault()):e.shiftKey||t!==w.length-1||(w[0].focus(),e.preventDefault())}(e))}function L(e){var t=void 0,n={header:b,hamburger:g,navigation:y,focusable:w,focusableNav:S,select:p};window.CustomEvent?t=new CustomEvent(e,{detail:n}):(t=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,n),document.dispatchEvent(t)}function k(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];E=!1,e&&q(!1),document.body.classList.remove(v.menuOpen),window.scrollTo(0,-1*parseInt(document.body.style.top)),document.body.style.top="";try{t(document.body).off("focus",x)}catch(e){}try{t(document).off("keydown",T)}catch(e){}L("mobileMenu.close")}!function(e){var t=!0;function n(n){t&&("function"==typeof e&&e(n),t=!1)}"loading"==document.readyState?document.addEventListener("readystatechange",n):n()}(function(){document.body.classList.contains(v.menuOpen)&&(E=!0),(b=document.querySelector(p.header))&&(g=b.querySelector(p.hamburger),y=b.querySelector(p.navigation),w=[].concat(i(b.querySelectorAll(p.focusable))),y&&(S=[].concat(i(y.querySelectorAll(p.focusable))),p.openOnTap&&v.focus&&f&&(O=[].concat(i(y.querySelectorAll(p.openOnTap))))),A())}),t(window).on("resize",A),t(l).on("click",p.hamburger,function(){E?k():(E=!0,q(!0),document.body.style.top="-"+window.pageYOffset+"px",document.body.classList.add(v.menuOpen),t(document.body).on("focus",x),t(document).on("keydown",T),L("mobileMenu.open")),this.blur()}),p.openOnTap&&v.focus&&f&&t(l).on("touchend",function(e){if(!E){var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.documentElement,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o="string"==typeof t;if(!e||1!=e.nodeType||!o&&!a(t))return console.warn("Wrong or missing arguments in function `bubbleUntil`"),null;for(var i=[e];o?!c(e,t):e!=t;)if(e=e.parentNode,i.push(e),!a(e))return!1;return n?i:e}(e.target,p.openOnTap);t?t.parentNode.classList.contains(v.focus)||(e.preventDefault(),e.stopPropagation(),M(),setTimeout(function(){t.focus()},0)):M()}}),v.focus&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"focus-within",n=void 0,c=void 0;function a(){var t=document.activeElement;if(n=!1,c!==t)for(c=t,[].concat(i(document.getElementsByClassName(e))).forEach(function(t){t.classList.remove(e)});t&&t.classList;)t.classList.add(e),t=t.parentNode}var r=function(){n||(o(a),n=!0)};t(document).on(["focus","blur"],r),r()}(v.focus)}()}();

//# sourceMappingURL=MobileMenu.js.map
