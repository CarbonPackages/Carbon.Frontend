export default function(callback = () => {}, delay = 10, repetitions = 10) {
    let x = 0;
    let intervalID = window.setInterval(() => {
        callback();
        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}
