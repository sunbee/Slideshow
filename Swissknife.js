export function removeAllChildren(parent) {
    /*
    Remove all the children of a parent node.
    */
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};
