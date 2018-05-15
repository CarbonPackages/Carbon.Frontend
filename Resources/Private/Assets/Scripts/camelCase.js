export default function(string) {
    return (string || "").replace(/(\-[a-z])/g, function(match) {
        return match.toUpperCase().replace(/-/, "");
    });
}
