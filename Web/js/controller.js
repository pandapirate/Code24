var equation = "";
var numberClicked = false;

var operations = ["+", "&minus;", "&times;", "&divide;"];
var used = [];
var result = 0;

var clickNumber = function(numberID) {
    if (numberClicked || $.inArray(numberID, used) != -1) {
        return;
    } else {
        equation += input[numberID];
        used.push(numberID);
        updateDisplay();
        numberClicked = true;
    }
};

var clickOp = function(opID) {
    if (numberClicked) {
        equation += operations[opID];
        updateDisplay();
        numberClicked = false;
    } else {
        return;
    }
};

var updateDisplay = function() {
    var ele = document.getElementById("solution");
    ele.innerHTML = equation + "=" + result;
};

var reset = function() {
    equation = "";
    result = 0;
    used = [];
    numberClicked = false;
}