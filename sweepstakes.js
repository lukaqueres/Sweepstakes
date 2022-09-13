const pass = () => {} // create function to let write some nice 'pass()' on if or something

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

const limits = {minVal:0, maxVal:100, drawLimit:100, markLimit:50};

var sweepstake;

function clearConfiguration() {
    localStorage.removeItem('sweepstakeConfiguration');
}

function checkConfiguration(configuration) {
    var drawLimit = parseInt(configuration.get("drawLimit"));
    var markLimit = parseInt(configuration.get("markLimit"));
    if (drawLimit < 0 || drawLimit > limits.drawLimit) {
        return false;
    }
    //console.log('marklimit: ' + markLimit + ' limits.marklimit: ' + limits.markLimit + ' drawlimit: ' + drawLimit)
    //console.log(markLimit > drawLimit)
    if (markLimit < 0 || markLimit > limits.markLimit || markLimit > drawLimit) {
        return false;
    }
    var minValue = configuration.get("minValue");
    var maxValue = configuration.get("maxValue");
    if (minValue < limits.minVal || minValue >= maxValue || minValue >= limits.maxVal) {
        return false;
    }
    if (maxValue > limits.maxVal || maxValue <= minValue || maxValue <= limits.minVal) {
        return false;
    }
    if ((maxValue - minValue) < drawLimit) {
        return false;
    }
    return true;
}

function chckMarks() {
    let checkNumbers = true;
    var markDiv = document.getElementById('markNumbers');
    var markInputs = markDiv.getElementsByClassName('NumberDrawInput');
    var marks = [];
    for(let i = 0; i < markInputs.length; i++) {
        marks.push(parseInt(markInputs[i].value));
    }
    console.log(marks);
    if(checkNumbers) {
        var check = MarkedNumbersCheck(marks);
        console.log(check);
        if (!check) {
            alert('Mark numbers input is invalid');
            return false;
        }
    }
    //let sweepstake = JSON.parse(localStorage.getItem('sweepstake'))
    //let sweepstake = localStorage.getItem('sweepstake');
    sweepstake.markedNumbers = marks;
    console.log(sweepstake);
    let numberOfHits = sweepstake.checkMarks();
    console.log(numberOfHits);
    var result = document.getElementById('resultContent');
    let message = 'You have correctly marked ' + numberOfHits + ' numbers. That is ' + Math.pow(2, numberOfHits) + ' my$ for you!';
    result.innerHTML = message;
}

function createConfiguration() {
    let configuration = new Map();
    configuration.set("drawLimit", document.getElementById('draw-limit').value);
    configuration.set("markLimit", document.getElementById('mark-limit').value);
    configuration.set("minValue", document.getElementById('min-value').value);
    configuration.set("maxValue", document.getElementById('max-value').value);
    return configuration;
}

function applyConfiguration() {
    var configuration = createConfiguration();
    if (!checkConfiguration(configuration)) {
        
        alert('Given configuration is invalid, changes were not applied');
        return false;
    }
    localStorage.setItem('sweepstakeConfiguration', JSON.stringify([...configuration]));
}

function runSweepstake() {
    sweepstake = new Sweepstake();
    let sweepstakeConfiguration = new Map(JSON.parse(localStorage.getItem('sweepstakeConfiguration')));
    if (sweepstakeConfiguration && sweepstakeConfiguration.size > 0) {
        sweepstake.configuration(sweepstakeConfiguration);
    }
    //sweepstake.developer(true);
    sweepstake.generateInputs();
    sweepstake.drawNumbers();
    localStorage.setItem('sweepstake', JSON.stringify(sweepstake));
    //localStorage.setItem('sweepstake', sweepstake);
    
}

class Sweepstake {
    constructor() { // -  Create Sweepstake class with default settings -
        this.set = new SetSweepstakeAttributes(this);
        this.get = new GetSweepstakeAttributes(this);
        this.draws = 20;
        this.marks = 10;
        this.range = [0, 20];
        this.drawd = [];
        this.marked =[];
        this.dev = false;
    }

    configuration(conf) {
        console.log(conf)
        this.drawLimit = conf.get("drawLimit");
        this.markLimit = conf.get("markLimit");
        this.minNum = conf.get("minValue");
        this.maxNum = conf.get("maxValue");
    }

    checkMarks() {
        let hits = 0;
        for (let i = 0; i < this.markedNumbers.length; i++) {
            if (this.drawdNumbers.includes(this.markedNumbers[i])) {
                hits += 1;
            }
        }
        return hits;
    }

    generateInputs() {
        var markDiv = document.getElementById('markNumbers');
        markDiv.innerHTML = '';
        for (let i = 0; i < this.markLimit; i++) {
            var input = document.createElement("input");
            input.type = "number";
            input.classList = "NumberDrawInput";
            input.min = this.minNum;
            input.max = this.maxNum;
            if (this.dev) {
                input.value = i;
            }
            else {
                input.value = 0;
            }
            input.name = "DrawdNumber" + i;
            markDiv.appendChild(input);
        } 
    }

    drawNumbers() {
        var nums = [];
        for (let i = this.minNum; i <= this.maxNum; i++) {
            nums.push(i);
        }
        //console.log(nums);
        //var num = Math.floor(Math.random() * nums.length);
        
        var drawdNumbers = [];
        var randomNum;
        for (let i = 0; i < this.drawLimit; i++) {
            //console.log(drawdNumbers + ' i: ' + i)
            //if(drawdNumbers.includes(randomNum)) {
            //    randomNum = random(this.minNum, this.maxNum);
            //}
            let num = Math.floor(Math.random() * nums.length);
            randomNum = nums.splice(num, 1);
            drawdNumbers.push(parseInt(randomNum[0]));
        }
        console.log(drawdNumbers);
        this.drawdNumbers = drawdNumbers;
    }



}

class SetSweepstakeAttributes {
    constructor(sweepstake) { // -  Create Sweepstake Add class for easy values set -
        this.sweepstake = sweepstake;
    }

    draws(draws) {
        this.sweepstake.draws = draws
    }

    marks(marks) {
        this.sweepstake.marks = marks
    }

    range(range) {
        if (!range.instanceof(Array)) {
            return false; // - TODO: Add error rise -
        }
        this.sweepstake.range = range
    }

    dev(status) {
        this.sweepstake.dev = status;
    }

    dict(dict) {
        this.sweepstake.draws = dict.get("draws");
        this.sweepstake.marks = dict.get("marks");
        this.sweepstake.range = dict.get("range");
        this.sweepstake.dev = dict.get("dev");
    }

}

class GetSweepstakeAttributes {
    constructor(sweepstake) { // -  Create Sweepstake Add class for easy values set -
        this.sweepstake = sweepstake;
    }

    draws() {
        return this.sweepstake.draws;
    }

    marks() {
        return this.sweepstake.marks;
    }

    range() {
        return this.sweepstake.range;
    }

    dev() {
        return this.sweepstake.dev;
    }

    drawd() {
        return this.sweepstake.drawd;
    }

    marked() {
        return this.sweepstake.marked;
    }
}