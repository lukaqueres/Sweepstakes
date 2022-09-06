const pass = () => {} // create function to let write some nice 'pass()' on if or something


function getParentElement(node, requirement) {
    if (requirement.startsWith('.')) {  // We are looking for parent with class
        pass();
    } else if (requirement.startsWith('#')) { // We are looking for parent with id
        pass();
    } else { // We are looking for parent with tag
        pass(); 
    }
}

function getParentElementByClassName(node, className) {
    let nodeParent = node.parentNode;
    while (nodeParent) {
        if (nodeParent.classList.contains(className)) {
            break;
        }
        nodeParent = nodeParent.parentNode;
    }
    return nodeParent;
}

function getParentElementByTag(node, tagName) {
    let nodeParent = node.parentNode;
    tagName = tagName.toUpperCase();
    while (nodeParent) {
        if (nodeParent.tagName == tagName) {
            break;
        }
        nodeParent = nodeParent.parentNode;
        if (nodeParent.tagName == 'body') {
            break;
        }
    }
    return nodeParent;
}