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
        this.drawLimit = 20;
        this.markLimit = 10;
        this.maxNum = 20;
        this.minNum = 0;
        this.drawdNumbers = [];
        this.markedNumbers =[];
        this.dev = false;
    }

    developer(status) {
        this.dev = status;
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