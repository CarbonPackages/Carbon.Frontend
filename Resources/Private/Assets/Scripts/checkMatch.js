import matches from './matches';
import isNode from './isNode';

export default function(element, selector) {
    if (!selector) {
        selector = '*';
    }
    // Check if the element is a node and if it matches the selecor
    return isNode(element) && matches(element, selector);
}
