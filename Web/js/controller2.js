var equation = "";
var numberClicked = false;
var lastOp = "";
var valueSaved = "";

var operations = ["+", "&minus;", "&times;", "&divide;"];
var used = [];
var result = 0;

var clickNumber = function(numberID) {
    if (numberClicked || $.inArray(numberID, used) != -1) {
        return;
    } else {
        equation += input[numberID];
        used.push(numberID);

        if (lastOp === "") {
            result = input[numberID];
        } else {
            switch (lastOp) {
                case 0: result += input[numberID]; break;
                case 1: result -= input[numberID]; break;
                case 2: result *= input[numberID]; break;
                case 3: result /= input[numberID]; break;
            }
            equation = "(" + equation + ")";
            verifyResult();
        }

        updateDisplay();
        numberClicked = true;
    }
        console.log(equation + "=" + result);

};

var clickOp = function(opID) {

    if (numberClicked) {
        equation += operations[opID];
        updateDisplay();
        numberClicked = false;
        lastOp = opID;
    } else {
        return;
    }
        console.log(equation + "=" + result);
};

var saveValue = function() {

    if (valueSaved === "") {
        document.getElementById("savedValue").innerHTML = "<b>"+result+"</b>";
        valueSaved = result;
        result = 0;
        equation = "";
        lastOp = "";
        numberClicked = false;
    } else {
        document.getElementById("savedValue").innerHTML = "<b>M</b>";
        equation += valueSaved;

        if (lastOp === "") {
            result = valueSaved;
        } else {
            switch (lastOp) {
                case 0: result += valueSaved; break;
                case 1: result -= valueSaved; break;
                case 2: result *= valueSaved; break;
                case 3: result /= valueSaved; break;
            }
            equation = "(" + equation + ")";
            verifyResult();
        }
        valueSaved = 0;
        numberClicked = true;
    }

    updateDisplay();
        console.log(equation + "=" + result);
}

var updateDisplay = function() {
    var ele = document.getElementById("solution");
    if (equation === "")
        ele.innerHTML = "";
    else
        ele.innerHTML = equation + " = " + result;
};

var verifyResult = function() {
    if (used.length === 4 && result === 24) {
        alert("You win");
    }
}

var reset = function() {
    equation = "";
    result = 0;
    used = [];
    numberClicked = false;
    lastOp = "";
    valueSaved = "";
    document.getElementById("savedValue").innerHTML = "<b>M</b>";

    updateDisplay();
};

var showSolution = function() {
    equation = finalSolution;
    result = 24;
    updateDisplay();
};

var next = function() {
    reset();
    randomize();
    updateCardDisplay();
};

var updateCardDisplay = function() {
    document.getElementById("card1").innerHTML = "<img src=\"resources\\cards\\" + imageNames[0] + "\">";
    document.getElementById("card2").innerHTML = "<img src=\"resources\\cards\\" + imageNames[1] + "\">";
    document.getElementById("card3").innerHTML = "<img src=\"resources\\cards\\" + imageNames[2] + "\">";
    document.getElementById("card4").innerHTML = "<img src=\"resources\\cards\\" + imageNames[3] + "\">";
};