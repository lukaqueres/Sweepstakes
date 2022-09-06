function random(min, max) { // - both inclusive, min and max can be returned too -
    min = Math.ceil(min); 
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function areBetween(array, min = 0, max = 20, inclusive = true) {
    for (let i = 0; i < array.length; i++) {
        if (inclusive) {
            if (array[i] <= max && array[i] >= min) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (array[i] < max && array[i] > min) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}

const hasDuplicates = (arr) => arr.length !== new Set(arr).size;

function wrap(e) {
    let wrapped = getParentElementByClassName(e.target, 'wrapable');
    if (wrapped.classList.contains('wrap')) {
        wrapped.classList.remove('wrap');
    } else {
        wrapped.classList.add('wrap');
    }
}