export default function(options) {
    if (typeof options == "string") {
        options = {
            theme: options
        };
    } else if (typeof options != "object") {
        options = {};
    }

    const OPT = {
        base: options.base || "/_Resources/Static/Packages",
        theme: options.theme || "GesagtGetan.Theme",
        assets: options.assets || "Assets/",
        scripts: options.scripts || "Scripts/",
        styles: options.styles || "Styles/"
    };

    let path = {
        base: OPT.base + "/"
    };
    path.theme = path.base + OPT.theme + "/";
    path.assets = path.theme + OPT.assets;
    path.scripts = path.theme + OPT.scripts;
    path.styles = path.theme + OPT.styles;

    return path;
}
