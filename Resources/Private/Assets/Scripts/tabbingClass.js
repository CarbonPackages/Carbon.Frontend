import Gator from '../Gator';

/**
 * This function add the css class `-tabbing` to the html
 * element if the user navigate through the site with tabs.
 * The class gets removed if the user start clicking again
 */

const tabClass = '-tabbing';
const classList = document.documentElement.classList;

function onTab(event) {
    // key 9 == tab key
    if (event.keyCode === 9) {
        classList.add(tabClass);
        Gator(document).off('keydown', onTab);
        Gator(document).on('mousedown', onMouseDown);
    }
}

function onMouseDown() {
    classList.remove(tabClass);
    Gator(document).off('mousedown', onMouseDown);
    Gator(document).on('keydown', onTab);
}

Gator(document).on('keydown', onTab);
