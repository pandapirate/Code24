var equation = "";
var displayEq = "";
var result = 0;
var numberClicked = false;

var operations = ["+", "-", "*", "/"];
var displayOp = ["+", "&minus;", "&times;", "&divide;"];
var used = [];

var score = 0;
var time = 99;
var hints = 3;
var skips = 3;

var hintUsed = false;
var myInterval = 0;

$(document).on('pagebeforeshow', '#game', function(){
    console.log("Moved to game");

    score = 0;
    time = 99;
    hints = 3;
    skips = 3;
    document.getElementById("skip").innerHTML = "Skip: " + skips;
    document.getElementById("hint").innerHTML = "Hint: " + hints;
    document.getElementById("timer").innerHTML = time;
    $('#hint').removeClass('ui-disabled');
    $('#skip').removeClass('ui-disabled');
    reset();
    startClock();
});

var endGame = function() {
    clearInterval(myInterval)
};

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
    if (displayEq === "")
        ele.innerHTML = "&nbsp;";
    else
        ele.innerHTML = displayEq + " = " + result;
};


var startClock = function() {
    if(myInterval > 0) clearInterval(myInterval);  // stop
    myInterval = setInterval( "updateClock()", 1000 );  // run
}

var updateClock = function() {
    time -= 1;
    document.getElementById("timer").innerHTML = time;
    if (time === 0) {
        clearInterval(myInterval);
        window.location.href = "#scores";
    }
}

var verifyResult = function() {
    if (used.length === 4 && result === 24) {
        score += hintUsed ? 500 : 1000;
        next();
        document.getElementById("score").innerHTML = score < 1000 ? "0" + score : score;
        document.getElementById("addScore").innerHTML = "Correct!";
        window.setTimeout( function(){document.getElementById("addScore").innerHTML = "";}, 2000 );
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
    hintUsed = true;

    equation = "";
    displayEq = "";
    result = 0;
    used = [];
    numberClicked = false;

    hints--;
    if (hints === 0) {
        $('#hint').addClass('ui-disabled');
    }
    var ele = document.getElementById("hint").innerHTML = "Hint: " + hints;
};

var next = function() {
    reset();
    randomize();
    updateCardDisplay();
    hintUsed = false;

    skips--;
    if (skips === 0) {
        $('#skip').addClass('ui-disabled');
    }
    var ele = document.getElementById("skip").innerHTML = "Skip: " + skips;
};

var updateCardDisplay = function() {
    document.getElementById("card1").src = "cards\\" + imageNames[0];
    document.getElementById("card2").src = "cards\\" + imageNames[1];
    document.getElementById("card3").src = "cards\\" + imageNames[2];
    document.getElementById("card4").src = "cards\\" + imageNames[3];
};