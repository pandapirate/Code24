var used = 0;

var score = 0;
var time = 99;
var skips = 3;

var myInterval = 0;

var left = 0;
var right = 0;

$(document).ready(function(){
//    console.log("Moved to game");
    resizeMainDiv(this);

    score = 0;
    time = 99;
    skips = 3;
    document.getElementById("skip").innerHTML = "Skip: " + skips;
    document.getElementById("timer").innerHTML = time;
    $('#skip').removeClass('ui-disabled');
//    startClock();

    $("#undo").click(function(){undo();})
    $("#reset").click(function(){reset();})
    $("#skip").click(function(){next();})

    $(".op-container").hide();
});

$( document ).on( "popupbeforeopen", "#operationMenu", function() {
    console.log("ahhhh");
});

var resizeMainDiv = function (main) {
    var mainHeight = $(window).height() - $(main).find('[data-role="header"]').height() - $(main).find('[data-role="footer"]').height() -5;
//    $(main).find('[data-role="main"]').height(mainHeight);
    var mainWidth = $(window).width();
    $('#mainContainer').css('top', $(main).find('[data-role="header"]').height());
    $('#mainContainer').css('width', mainWidth);
    $('#mainContainer').css('height', mainHeight);

    $('#card1-container').css('top', 0);
    $('#card1-container').css('left', 0);
    $('#card2-container').css('top', 0);
    $('#card2-container').css('left', mainWidth/2);
    $('#card3-container').css('top', mainHeight/2);
    $('#card3-container').css('left', 0);
    $('#card4-container').css('top', mainHeight/2);
    $('#card4-container').css('left', mainWidth/2);

//    console.log($(main).find('[data-role="header"]').height());
//    console.log($(window).width()+ ", " + mainHeight);
}

var registerNumbers = function(num1, num2) {
    var map = {'card1-container': input[0], 'card2-container': input[1], 'card3-container': input[2], 'card4-container': input[3]};

    left = map[num1];
    right = map[num2];
};

var getEquation = function(op) {
    switch(op) {
        case 0: return left + " + " + right;
        case 1: return left + " &minus; " + right;
        case 2: return left + " &times; " + right;
        case 3: return left + " &divide; " + right;
    };
};

var operationClick = function(op) {
  console.log("Clicked function " + op);

//  $('#operationMenu').popup('close');
};

var endGame = function() {
    clearInterval(myInterval)
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
        score += 1000;
        next();
        document.getElementById("score").innerHTML = score < 1000 ? "0" + score : score;
    }
};

var undo = function() {
    console.log("Undo");
}

var reset = function() {
    used = 0;
    updateCardDisplay();
};

var next = function() {
    randomize();
    reset();

    skips--;
    if (skips === 0) {
        $('#skip').addClass('ui-disabled');
    }
    var ele = document.getElementById("skip").innerHTML = "Skip: " + skips;
};

var updateCardDisplay = function() {
    $('#card1-container').css('background-image', "url(cards/" + imageNames[0] +")");
    $('#card2-container').css('background-image', "url(cards/" + imageNames[1] +")");
    $('#card3-container').css('background-image', "url(cards/" + imageNames[2] +")");
    $('#card4-container').css('background-image', "url(cards/" + imageNames[3] +")");
};