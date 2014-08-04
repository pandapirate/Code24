var used = 0;

var score = 0;
var time = 0;
var skips = 3;

var myInterval = 0;

var left = 0;
var right = 0;
var target = null;
var map = {};
var randomBG = ["images/c.png", "images/d.png", "images/h.png", "images/s.png"];

$(document).ready(function(){
//    console.log("Moved to game");
    randomize();
    resizeMainDiv(this);
    updateCardDisplay();

    score = 0;
    time = 0;
    skips = 3;
    document.getElementById("skip").innerHTML = "Skip: " + skips;
    document.getElementById("timer").innerHTML = time;
    map = {'card1-container': input[0], 'card2-container': input[1], 'card3-container': input[2], 'card4-container': input[3]};

    $('#skip').removeClass('ui-disabled');
    startClock();

    $("#undo").click(function(){undo();})
    $("#reset").click(function(){reset();})
    $("#skip").click(function(){next(true);})

    $(".op-container").hide();

    $('.card-container').draggable({/*containment:"#mainContainer", */snap:".card-container", revert:true,  opacity:0.5,
        start: function(event, ui) {
            console.log("start")
            $(this).css("width", "25%");
            $(this).css("height", "25%");
            $(this).find(".calculated-results").css("font-size", "100%");
        },
        stop: function( event, ui ) {
            console.log("return")
            $(this).css("width", "50%");
            $(this).css("height", "50%");
            $(this).find(".calculated-results").css("font-size", "250%");
        },
        cursor: "crosshair",
        cursorAt: { top: $(this).height()/8, left: $(this).width()/8 }
    });

    $("#mainContainer div" ).draggable({ stack: "#mainContainer div" });
    $('.card-container').droppable({
        accept: ".card-container",
        over: function( event, ui ) {
//                    console.log("in");
            $(this).find(".op-container").show();
        },
        out: function( event, ui ) {
//                    console.log("out");
            $(this).find(".op-container").hide();
        },
        drop: function( event, ui ) {
            var draggableId = ui.draggable.attr("id");
            var droppableId = $(this).attr("id");
//            console.log(draggableId + " dropped on " + droppableId);
            registerNumbers(draggableId, droppableId, this);
            $(this).find(".op-container").hide();
        }
    });

    $('.operations').droppable({
        accept: ".card-container",
        drop: function (event, ui) {
            var draggableId = ui.draggable.attr("id");
            var droppableClass = $(this).attr("class");
            calculateAtPosition(ui.draggable, this);
//            console.log(draggableId + " dropped on " + droppableClass);
        }
    });
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

var registerNumbers = function(num1, num2, t) {

    left = map[num1];
    right = map[num2];
    target = t;
};

var calculateAtPosition = function(draggable, op) {
//    console.log(left);
//    console.log(right);
//    console.log(target);
//    console.log(draggable);
//    console.log(op);

    var results = 0;
    if ($(op).hasClass("add"))
        results = left + right;
    else if ($(op).hasClass("minus"))
        results = left - right;
    else if ($(op).hasClass("times"))
        results = left * right;
    else if ($(op).hasClass("divide"))
        results = left / right;

    console.log(results);
    var rand = Math.floor(Math.random() * 4);
    $(target).css("background-image", "url(" + randomBG[rand] +")"); //change bg to random

    var resultString = results;
    if (results - Math.floor(results) > 0)
        resultString = results.toFixed(2);

    $(target).find(".calculated-results").html("<h1>" + resultString + "</h1>");
    draggable.hide();

    delete map[draggable.attr("id")];
    used++;

    map[$(target).attr("id")] = results;
    console.log(map);

    if (used === 3) {
        verifyResult(results);
    }
};

var operationClick = function(op) {
  console.log("Clicked function " + op);

//  $('#operationMenu').popup('close');
};

var endGame = function() {
    clearInterval(myInterval)
};

var startClock = function() {
    if(myInterval > 0) clearInterval(myInterval);  // stop
    myInterval = setInterval( "updateClock()", 1000 );  // run
}

var updateClock = function() {
    time += 1;
    document.getElementById("timer").innerHTML = time;
    if (time === 0) {
        clearInterval(myInterval);
        window.location.href = "#scores";
    }
}

var verifyResult = function(result) {
    if (result === 24) {
        score += 1000;
        next(false);
        document.getElementById("score").innerHTML = score < 1000 ? "0" + score : score;
    }
};

var undo = function() {
    console.log("Undo");
}

var reset = function() {
    used = 0;
    map = {'card1-container': input[0], 'card2-container': input[1], 'card3-container': input[2], 'card4-container': input[3]};

    updateCardDisplay();
};

var next = function(clickedSkip) {
    randomize();
    reset();

    if (clickedSkip) {
        skips--;
        if (skips === 0) {
            $('#skip').addClass('ui-disabled');
        }
        var ele = document.getElementById("skip").innerHTML = "Skip: " + skips;
    }
};

var updateCardDisplay = function() {
    $('.card-container').show();
    $('.card-container').find(".calculated-results").html("");

    $('#card1-container').css('background-image', "url(cards/" + imageNames[0] +")");
    $('#card2-container').css('background-image', "url(cards/" + imageNames[1] +")");
    $('#card3-container').css('background-image', "url(cards/" + imageNames[2] +")");
    $('#card4-container').css('background-image', "url(cards/" + imageNames[3] +")");
};

