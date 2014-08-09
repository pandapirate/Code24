/**
 * Created with IntelliJ IDEA.
 * User: Kevin
 * Date: 8/4/14
 * Time: 10:51 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).delegate('#scores', 'pageshow', function () {
    //Your code for each page load here
//    console.log("score page");
    drawTable();
});

var calculateScore = function(elapsedTime) {
    return Math.floor(12000 * Math.exp(-0.018*elapsedTime));
}

var drawTable = function() {
    $("#score-table > tbody").html(""); //clear out before
//    timePerQ = [15, 30, 50, 99];
//    skips = 1;
    var totalTime = 0;
    var totalScore = 0;
    for (var i in timePerQ) {
        var time = timePerQ[i];
        if (i > 0) {
            time -= timePerQ[i-1];
        }
        totalTime += time;
        var score = calculateScore(time);
        totalScore += score;
        var qNumber = Math.floor(i)+1;
        $("#score-table > tbody").append("<tr style='color:gray;'><th>"+qNumber+"</th><th>"+time+"</th><th>"+score+"</th></tr>");
//        $("#score-table").table(refresh);
    }
    var negativePts = 5000 * (skips - 3);
    totalScore += negativePts;
    var skipMessage = (3-skips);
    $("#score-table > tbody").append("<tr style='color:red;'><th>Skips</th><th>"+skipMessage+"</th><th>"+negativePts+"</th></tr>");
    $("#score-table > tbody").append("<tr><th>Total</th><th>"+totalTime+"</th><th>"+totalScore+"</th></tr>");
    updateScore(totalTime, totalScore);
}

var updateScore = function(totalTime, totalScore) {
//    $.cookie('name', 'value', { path: '/' });
    var curTime = $.cookie('bestTime');
    var curScore = $.cookie('bestScore');

    curTime = typeof curTime === "undefined" ? 0 : curTime;
    curScore = typeof curScore === "undefined" ? 0 : curScore;

    var timeDisplay = curTime === 0 ? "N/A" : curTime;
    var scoreDisplay = curScore === 0 ? "N/A" : curScore;

    $("#score-table > tbody").append("<tr style='color:green;'><th><h4>Record</h4></th><th><h4>"+timeDisplay+"</h4></th><th><h4>"+scoreDisplay+"</h4></th></tr>");

    if (totalScore > curScore) {
//        console.log("new");
        $.cookie('bestTime', totalTime, { path: '/' });
        $.cookie('bestScore', totalScore, { path: '/' });

        $('#highscore-message').popup('open');
        setTimeout(function () {
            $('#highscore-message').popup('close');
        }, 2000);
    }
}