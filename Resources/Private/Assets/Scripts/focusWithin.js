import Gator from "gator";
import requestAnimationFrame from "./requestAnimationFrame";

export default function(className = "focus-within") {
    let running;
    let last;

    function action() {
        let element = document.activeElement;
        running = false;
        if (last !== element) {
            last = element;
            [...document.getElementsByClassName(className)].forEach(el => {
                el.classList.remove(className);
            });

            while (element && element.classList) {
                element.classList.add(className);
                element = element.parentNode;
            }
        }
    }

    function returnFunction() {
        return () => {
            if (!running) {
                requestAnimationFrame(action);
                running = true;
            }
        };
    }

    let update = returnFunction();
    Gator(document).on(["focus", "blur"], update);
    update();
}
