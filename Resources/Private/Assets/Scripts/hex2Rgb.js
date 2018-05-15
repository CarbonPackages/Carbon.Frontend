export default function(hex = "#fff", opacity = 1) {
    hex = hex.replace("#", "");
    let rgb = hex.match(new RegExp("(.{" + hex.length / 3 + "})", "g"));
    for (let i = 0; i < 3; i++) {
        rgb[i] = parseInt((rgb[i].length == 1 ? rgb[i] : "") + rgb[i], 16);
    }
    rgb = rgb.join(",");
    if (opacity < 1) {
        return `rgba(${rgb},${opacity})`;
    } else {
        return `rgb(${rgb})`;
    }
}
