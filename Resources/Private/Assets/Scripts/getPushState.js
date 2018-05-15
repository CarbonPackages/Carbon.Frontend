export default function() {
    const HASH = location.hash.substr(1);
    const STATE = history.state;

    return {
        url: location.pathname,
        title: document.title,
        state: STATE ? STATE : null,
        hash: HASH ? HASH : null
    };
}
