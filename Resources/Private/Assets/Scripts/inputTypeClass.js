import Gator from '../Gator';

/**
 * These functions add css classes to the html element
 * `-mouse` if the user move his mouse
 * `-touch` if the user use his touchscreen
 * These two classes get swapped
 */

const mouseClass = '-mouse';
const touchClass = '-touch';
const classList = document.documentElement.classList;

function onMouseMove() {
    console.log('onMouseMove');
    classList.remove(touchClass);
    classList.add(mouseClass);
    Gator(document).off('mousemove', onMouseMove);
    Gator(document).on('touchstart', onTouch);
}

function onTouch() {
    console.log('onTouch');
    classList.remove(mouseClass);
    classList.add(touchClass);
    Gator(document).off('touchstart', onTouch);
    Gator(document).on('mousemove', onMouseMove);
}

Gator(document).on('touchstart', onTouch);
Gator(document).on('mousemove', onMouseMove);
