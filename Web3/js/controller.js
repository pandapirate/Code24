var used = 0;

var score = 0;
var time = 0;
var skips = 3;

var myInterval = 0;

var questionNumber = 0;
var left = 0;
var right = 0;
var target = null;
var map = {};
var randomBG = ["images/c.png", "images/d.png", "images/h.png", "images/s.png"];

var state = {
    card1_bg:"",
    card1_hidden:"",
    card1_calc:"",
    card2_bg:"",
    card2_hidden:"",
    card2_calc:"",
    card3_bg:"",
    card3_hidden:"",
    card3_calc:"",
    card4_bg:"",
    card4_hidden:"",
    card4_calc:"",
    map:{}
};

$(document).ready(function(){
//    console.log("Moved to game");
    randomize();
    resizeMainDiv(this);
    updateCardDisplay();

    score = 0;
    time = 0;
    questionNumber = 0;
    skips = 3;
    document.getElementById("skip").innerHTML = "Skip: " + skips;
    document.getElementById("score").innerHTML = "0000";
    document.getElementById("timer").innerHTML = time;
    map = {'card1-container': input[0], 'card2-container': input[1], 'card3-container': input[2], 'card4-container': input[3]};

    $('#skip').removeClass('ui-disabled');
    $('#undo').addClass('ui-disabled');
    startClock();

    $("#undo").click(function(){undo();})
    $("#reset").click(function(){reset();})
    $("#skip").click(function(){next(true);})

    $(".op-container").hide();
//    updateState();

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
    updateState();

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

    $("#undo").removeClass("ui-disabled");
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
        document.getElementById("score").innerHTML = score < 1000 ? "0" + score : score;

        questionNumber += 1;
        next(false);

        if (questionNumber >= 5)
            window.location.href = "#scores";
    }
};

var undo = function() {
    console.log("Undo");
    used --;

    if (state.card1_hidden)
        $("#card1-container").hide();
    else {
        $("#card1-container").show();
        $("#card1-container").css("background-image", state.card1_bg);
        $("#card1-container").find(".calculated-results").html(state.card1_calc);
    }

    if (state.card2_hidden)
        $("#card2-container").hide();
    else {
        $("#card2-container").show();
        $("#card2-container").css("background-image", state.card2_bg);
        $("#card2-container").find(".calculated-results").html(state.card2_calc);
    }

    if (state.card3_hidden)
        $("#card3-container").hide();
    else {
        $("#card3-container").show();
        $("#card3-container").css("background-image", state.card3_bg);
        $("#card3-container").find(".calculated-results").html(state.card3_calc);
    }

    if (state.card4_hidden)
        $("#card4-container").hide();
    else {
        $("#card4-container").show();
        $("#card4-container").css("background-image", state.card4_bg);
        $("#card4-container").find(".calculated-results").html(state.card4_calc);
    }

    map = state.map;

    $("#undo").addClass("ui-disabled")
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

var updateState = function() {
    state.card1_bg = $("#card1-container").css("background-image");
    state.card1_hidden = $("#card1-container").is(":hidden");
    state.card1_calc = $("#card1-container").find(".calculated-results").html()

    state.card2_bg = $("#card2-container").css("background-image");
    state.card2_hidden = $("#card2-container").is(":hidden");
    state.card2_calc = $("#card2-container").find(".calculated-results").html()

    state.card3_bg = $("#card3-container").css("background-image");
    state.card3_hidden = $("#card3-container").is(":hidden");
    state.card3_calc = $("#card3-container").find(".calculated-results").html()

    state.card4_bg = $("#card4-container").css("background-image");
    state.card4_hidden = $("#card4-container").is(":hidden");
    state.card4_calc = $("#card4-container").find(".calculated-results").html()

    state.map = jQuery.extend(true, {}, map);
    console.log(state);
}