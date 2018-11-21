!function(){"use strict";function e(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var t,n=(function(e){!function(){var t,n=0,o=0,i={},r={};function c(e,o,i){return"_root"==o?i:e!==i?function(e){return t||(t=e.matches?e.matches:e.webkitMatchesSelector?e.webkitMatchesSelector:e.mozMatchesSelector?e.mozMatchesSelector:e.msMatchesSelector?e.msMatchesSelector:e.oMatchesSelector?e.oMatchesSelector:l.matchesSelector)}(e).call(e,o)?e:e.parentNode?(n++,c(e.parentNode,o,i)):void 0:void 0}function a(e,t,n,o){i[e.id]||(i[e.id]={}),i[e.id][t]||(i[e.id][t]={}),i[e.id][t][n]||(i[e.id][t][n]=[]),i[e.id][t][n].push(o)}function s(e,t,n,o){if(i[e.id])if(t)if(o||n)if(o){if(i[e.id][t][n])for(var r=0;r<i[e.id][t][n].length;r++)if(i[e.id][t][n][r]===o){i[e.id][t][n].splice(r,1);break}}else delete i[e.id][t][n];else i[e.id][t]={};else for(var c in i[e.id])i[e.id].hasOwnProperty(c)&&(i[e.id][c]={})}function u(e,t,o,u){if(this.element){e instanceof Array||(e=[e]),o||"function"!=typeof t||(o=t,t="_root");var d,f=this.id;for(d=0;d<e.length;d++)u?s(this,e[d],t,o):(i[f]&&i[f][e[d]]||l.addEvent(this,e[d],m(e[d])),a(this,e[d],t,o));return this}function m(e){return function(t){!function(e,t,o){if(i[e][o]){var a,s,u=t.target||t.srcElement,d={},f=0,m=0;for(a in n=0,i[e][o])i[e][o].hasOwnProperty(a)&&(s=c(u,a,r[e].element))&&l.matchesEvent(o,r[e].element,s,"_root"==a,t)&&(n++,i[e][o][a].match=s,d[n]=i[e][o][a]);for(t.stopPropagation=function(){t.cancelBubble=!0},f=0;f<=n;f++)if(d[f])for(m=0;m<d[f].length;m++){if(!1===d[f][m].call(d[f].match,t))return void l.cancel(t);if(t.cancelBubble)return}}}(f,t,e)}}}function l(e,t){if(!(this instanceof l)){for(var n in r)if(r[n].element===e)return r[n];return r[++o]=new l(e,o),r[o]}this.element=e,this.id=t}l.prototype.on=function(e,t,n){return u.call(this,e,t,n)},l.prototype.off=function(e,t,n){return u.call(this,e,t,n,!0)},l.matchesSelector=function(){},l.cancel=function(e){e.preventDefault(),e.stopPropagation()},l.addEvent=function(e,t,n){var o="blur"==t||"focus"==t;e.element.addEventListener(t,n,o)},l.matchesEvent=function(){return!0},e.exports&&(e.exports=l),window.Gator=l}()}(t={exports:{}},t.exports),t.exports);function o(e,t){return e&&"string"==typeof t&&1==e.nodeType?(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t):(console.warn("Wrong or missing arguments in function `matches`"),null)}function i(e){return 1==e.nodeType}var r={key:{tab:9,escape:27},selector:{header:".page-header",navigation:".mainnav",hamburger:".hamburger-icon",openOnTap:".mainnav__element--hassub > a.mainnav__link--level1",focusable:["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]","[tabindex]:not([tabindex^='-'])"].join(",")},menuOpen:"-menuopen",htmlElement:document.documentElement,isTouch:"ontouchstart"in document.documentElement,focusWithin:document};!function(){var t,c,a,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},u=s.selector,l=void 0===u?{}:u,d=s.menuOpen,f=void 0===d?r.menuOpen:d,m=s.focusWithin,h=void 0===m?r.focusWithin:m,p=s.isTouch,v=void 0===p?r.isTouch:p,b=s.setTop,y=void 0!==b&&b,g=Object.assign({},r.selector,l),w=[],E=[],S=!1,O=[];function T(){O.forEach(function(e){e.blur()})}function L(){if(a){var e=window.getComputedStyle(a);"none"==e.display||"0"==e.opacity||"hidden"==e.visibility?(j(!1),M(!0)):document.body.classList.contains(f)||M(!1)}}function M(e){E.forEach(function(t){t.tabIndex=e?0:-1})}function k(e){S&&!t.contains(e.target)&&w.length&&w[0].focus()}function x(e){S&&(e.which===r.key.escape&&(e.preventDefault(),j()),e.which===r.key.tab&&function(e){var t=w.indexOf(document.activeElement);e.shiftKey&&0===t?(w[w.length-1].focus(),e.preventDefault()):e.shiftKey||t!==w.length-1||(w[0].focus(),e.preventDefault())}(e))}function A(e){var n,o={header:t,hamburger:a,navigation:c,focusable:w,focusableNav:E,select:g};window.CustomEvent?n=new CustomEvent(e,{detail:o}):(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,o),document.dispatchEvent(n)}function j(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];S=!1,e&&M(!1),r.htmlElement.classList.remove(f),document.body.classList.remove(f),y&&(window.scrollTo(0,-1*parseInt(document.body.style.top)),document.body.style.top="");try{n(document.body).off("focus",k)}catch(e){}try{n(document).off("keydown",x)}catch(e){}A("mobileMenu.close")}!function(e){var t=!0;function n(n){t&&("function"==typeof e&&e(n),t=!1)}"loading"==document.readyState?document.addEventListener("readystatechange",n):n()}(function(){document.body.classList.contains(f)&&(S=!0),(t=document.querySelector(g.header))&&(a=t.querySelector(g.hamburger),c=t.querySelector(g.navigation),w=e(t.querySelectorAll(g.focusable)),c&&(E=e(c.querySelectorAll(g.focusable)),g.openOnTap&&v&&(O=e(c.querySelectorAll(g.openOnTap)))),L())}),n(window).on("resize",L),n(r.htmlElement).on("click",g.hamburger,function(){S?j():(S=!0,M(!0),y&&(document.body.style.top="-".concat(window.pageYOffset,"px")),r.htmlElement.classList.add(f),document.body.classList.add(f),n(document.body).on("focus",k),n(document).on("keydown",x),A("mobileMenu.open")),this.blur()}),g.openOnTap&&v&&n(r.htmlElement).on("touchend",function(e){if(!S){var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.documentElement,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r="string"==typeof t;if(!e||1!=e.nodeType||!r&&!i(t))return console.warn("Wrong or missing arguments in function `bubbleUntil`"),null;for(var c=[e];r?!o(e,t):e!=t;)if(e=e.parentNode,c.push(e),!i(e))return!1;return n?c:e}(e.target,g.openOnTap);t?t.parentNode.classList.contains(cssClasses.focus)||(e.preventDefault(),e.stopPropagation(),T(),setTimeout(function(){t.focus()},0)):T()}}),h&&function(e,t){var n=Object(t),o=n.className,i=void 0===o?"":o,r=n.attr,c=void 0===r?"focus-within":r,a=n.force,s=[];try{if(e.querySelector(":focus-within"),!a)return l}catch(e){}function u(){for(var t;t=s.pop();)c&&t.removeAttribute(c),i&&t.classList.remove(i);var n=e.activeElement;if(!/^(#document|HTML|BODY)$/.test(Object(n).nodeName))for(;n&&1===n.nodeType;)c&&n.setAttribute(c,""),i&&n.classList.add(i),s.push(n),n=n.parentNode}function l(){e.addEventListener("focus",u,!0),e.addEventListener("blur",u,!0)}!function t(){/m/.test(e.readyState)?(e.removeEventListener("readystatechange",t),l()):e.addEventListener("readystatechange",t)}()}(h)}()}();
