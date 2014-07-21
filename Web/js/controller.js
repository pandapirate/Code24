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
    if (equation === "")
        ele.innerHTML = "";
    else
        ele.innerHTML = equation + "=" + result;
};

var reset = function() {
    equation = "";
    result = 0;
    used = [];
    numberClicked = false;
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