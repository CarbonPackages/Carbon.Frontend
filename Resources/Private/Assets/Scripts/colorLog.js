const COLORS = {
    default: ["#212121", "#b0bec5"], // default
    error: ["#ffebee", "#c62828"], // red
    success: ["#e8f5e9", "#2e7d32"], // green
    warn: ["#fff3e0", "#f4511e"], // orange
    info: ["#ede7f6", "#651fff"] // purple
};

const TYPES = Object.keys(COLORS);

function colorCSS(style) {
    return `color:${COLORS[style][0]};background-color:${
        COLORS[style][1]
    };font-weight:bold;padding:3px 6px;border-radius:2px;`;
}

function output(style, first, ...arg) {
    if (typeof first == "string") {
        console.log(`%c${first}`, colorCSS(style), ...arg);
    } else {
        console.log(first, ...arg);
    }
}

function colorLog(enable = true) {
    let log = enable
        ? function() {
              output("default", ...arguments);
          }
        : function() {};
    TYPES.forEach(type => {
        log[type] = enable
            ? function() {
                  output(type, ...arguments);
              }
            : function() {};
    });

    return log;
}

export default colorLog;
