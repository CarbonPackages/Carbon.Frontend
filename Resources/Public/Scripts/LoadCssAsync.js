/*!
 * Carbon.Frontend - created by Jon Uhlmann
 * @build 2018-06-04 12:22
 * @link https://github.com/CarbonPackages/Carbon.Frontend
 */
!function(){"use strict";!function(t){t.loadCSS||(t.loadCSS=function(){});var e=loadCSS.relpreload={};if(e.support=function(){var e;try{e=t.document.createElement("link").relList.supports("preload")}catch(t){e=!1}return function(){return e}}(),e.bindMediaToggle=function(t){var e=t.media||"all";function n(){t.media=e}t.addEventListener?t.addEventListener("load",n):t.attachEvent&&t.attachEvent("onload",n),setTimeout(function(){t.rel="stylesheet",t.media="only x"}),setTimeout(n,3e3)},e.poly=function(){if(!e.support())for(var n=t.document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a];"preload"!==o.rel||"style"!==o.getAttribute("as")||o.getAttribute("data-loadcss")||(o.setAttribute("data-loadcss",!0),e.bindMediaToggle(o))}},!e.support()){e.poly();var n=t.setInterval(e.poly,500);t.addEventListener?t.addEventListener("load",function(){e.poly(),t.clearInterval(n)}):t.attachEvent&&t.attachEvent("onload",function(){e.poly(),t.clearInterval(n)})}}(window)}();

//# sourceMappingURL=LoadCssAsync.js.map