var numbersLength = 10;
var drawdNumbersLength = 20;
var minNumber = 0;
var maxNumber = 20;
var debug = true;


var globaldrawdNumbers = [];
var globalmarkedNumbers = [];
var globalhits;


function runScrpt() {
    addNumberMarkInputs(numbersLength);
    globaldrawdNumbers = DrawNumbers(drawdNumbersLength, minNumber, maxNumber);
}

function addNumberMarkInputs(length = 10, min = 0, max = 20, defaultVal = 0) {
    var markDiv = document.getElementById('markNumbers');

    for (let i = 0; i < length; i++) {
        var input = document.createElement("input");
        input.type = "number";
        input.classList = "NumberDrawInput";
        input.min = min;
        input.max = max;
        if (debug) {
            input.value = i;
        }
        else {
            input.value = defaultVal;
        }
        input.name = "DrawdNumber" + i;
        markDiv.appendChild(input);
    } 
}

function chckNums() {
    globalmarkedNumbers = getMarkedNumbers();
    globalhits = numberHitCheck(globalmarkedNumbers, globaldrawdNumbers);
    console.log(globalhits);
}

function MarkedNumbersCheck(numbers) {
    if (hasDuplicates(numbers)) {
        console.log('haveduplicate');
        return false;
    }
    if (areBetween(numbers, minNumber, maxNumber)) {
        console.log('arenotBeetween');
        return false;
    }
    return true;
}

function DrawNumbers(length = 10, min = 0, max = 20) {
    var drawdNumbers = [];
    while (!hasDuplicates(drawdNumbers)) {
        for (let i = 0; i < length; i++) {
            drawdNumbers.push(random(min, max));
        }
    }
    return drawdNumbers;
}

function getMarkedNumbers(checkNumbers = true) {
    var markDiv = document.getElementById('markNumbers');
    var markInputs = markDiv.getElementsByClassName('NumberDrawInput');
    var marks = [];
    for(let i = 0; i < markInputs.length; i++) {
        marks.push(markInputs[i].value);
    }
    console.log(marks);
    if(checkNumbers) {
        var check = MarkedNumbersCheck(marks);
        if (!check) {
            alert('Mark numbers input is invalid');
            return false;
        }
        console.log(check);
    }
    return marks;
}

function numberHitCheck(markedNumbers, drawdNumbers) {

}