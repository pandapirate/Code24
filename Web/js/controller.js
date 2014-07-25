var equation = "";
var displayEq = "";
var result = 0;
var numberClicked = false;

var operations = ["+", "-", "*", "/"];
var displayOp = ["+", "&minus;", "&times;", "&divide;"];
var used = [];

var clickNumber = function(numberID) {
    if (numberClicked || $.inArray(numberID, used) != -1) {
        return;
    } else {
        equation += input[numberID];
        displayEq += input[numberID];
        used.push(numberID);

        findAnswer();
        updateDisplay();
        numberClicked = true;
    }
    //console.log(equation + "=" + result);
};

var clickOp = function(opID) {
    if (numberClicked) {
        equation += operations[opID];
        displayEq += displayOp[opID];
        updateDisplay();
        numberClicked = false;
    } else
        return;

//    console.log(equation + "=" + result);
};

var addParenthesis = function(id) {
    var char = equation.substring(equation.length-1);
    console.log(char + " -- " + operations.indexOf(char));

    if (char != "" && id === 0 && (operations.indexOf(char) === -1))
        return;
    else if (id === 1 && operations.indexOf(char) > -1)
        return;

    if (id === 0) {
        equation += "(";
        displayEq += "(";
    } else {
        equation += ")";
        displayEq += ")";
    }
    findAnswer();
    updateDisplay();
};

var findAnswer = function() {
    try {
        result = eval(equation);
        verifyResult();
    } catch (e) {
        if (e instanceof SyntaxError) {
            result = "";
        }
    }
}

var updateDisplay = function() {
    var ele = document.getElementById("equation");
    //console.log(ele);
    if (displayEq === "")
        ele.innerHTML = "";
    else
        ele.innerHTML = "<h2>" + displayEq + " = " + result + "</h2>";

};

var verifyResult = function() {
    if (used.length === 4 && result === 24) {
        alert("You win");
    }
};

var backspace = function() {
    equation = equation.substring(0, equation.length-1);
    updateDisplay();
};

var reset = function() {
    equation = "";
    displayEq = "";
    result = 0;
    used = [];
    numberClicked = false;

    updateDisplay();
};

var showSolution = function() {
    displayEq = finalSolution;
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