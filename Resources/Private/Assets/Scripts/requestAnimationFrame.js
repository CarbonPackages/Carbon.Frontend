const WIN = window;
const REQUEST_ANIMATION_FRAME =
    WIN.requestAnimationFrame ||
    WIN.mozRequestAnimationFrame ||
    WIN.webkitRequestAnimationFrame ||
    WIN.msRequestAnimationFrame ||
    WIN.oRequestAnimationFrame ||
    // IE Fallback
    function(callback) {
        WIN.setTimeout(callback, 1000 / 60);
    };

export default REQUEST_ANIMATION_FRAME;
