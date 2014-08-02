/**
 * Created with IntelliJ IDEA.
 * User: khuang
 * Date: 7/18/14
 * Time: 11:28 AM
 * To change this template use File | Settings | File Templates.
 */

//struct for Node
function Node (left, right, op, group, base) {
    this.left = left;
    this.right = right;
    this.op = op;
    this.group = group;
    this.value = base;

    if (this.left != null && this.right != null && base == null) {
        switch (this.op) {
            case "ADD": this.value = this.left.value + this.right.value;
                break;
            case "SUBTRACT": this.value = this.left.value - this.right.value;
                break;
            case "MULTIPLY": this.value = this.left.value * this.right.value;
                break;
            case "DIVIDE": this.value = this.left.value / this.right.value;
                break;
        }
    }

    this.printNode = function() {
        if (this.left === null || this.right === null)
            return this.value;
        else if (group === null)
            return this.left.getEq() + " " + this.translateOp() + " " + this.right.getEq() + " = " + this.value;
        else
            return this.group + " " + this.left.getEq() + " " + this.translateOp() + " " + this.right.getEq() + " = " + this.value
    };

    this.getEq = function() {
        if (this.left == null && this.right == null)
            return this.value + "";
        else
            return "(" + this.left.getEq() + " " + this.translateOp() + " " + this.right.getEq() + ")";
    }

    this.translateOp = function() {
        switch (this.op) {
            case "ADD":
                return "+";
            case "SUBTRACT":
                return "&minus;";
            case "MULTIPLY":
                return "&times;";
            case "DIVIDE":
                return "&divide;";
        }
        return "";
    }
};

var solveEq = function() {
    solve(input[0], input[1], input[2], input[3]);
}

var finalSolution = "";

var solve = function(a, b, c, d) {
    var baseNodes = [new Node(null, null, null, null, a), new Node(null, null, null, null, b), new Node(null, null, null, null, c), new Node(null, null, null, null, d)];

    //create pair nodes
    var pairNodes = [];
    var counter = 1;
    for (var i = 0; i < 3; i++) {
        for (var j = i+1; j < 4; j++) {
            var result = performOperations(baseNodes[i], baseNodes[j], getCat(counter++));
            pairNodes = pairNodes.concat(result);
        }
    }

//    document.write("<div>"+pairNodes.length +" pairs</div>");

    var solution = [];
    //calculate 2x2
    solution = solution.concat(calculate2x2(pairNodes));

    //calculate 3x1
    solution = solution.concat(calculate3x1(pairNodes, baseNodes));


//    for (var i in solution) {
//        document.write("<div>" + solution[i].printNode() + "</div>");
//    }

    var result = findSolution(solution);
    if (result === null) {
        //document.write("No Solution");
        finalSolution = "No Solution";
    } else {
        //document.write(result.printNode());
        finalSolution = result.getEq();
    }
};

var input = [];
var imageNames = [];
var randomize = function() {
    finalSolution = "";
    imageNames = [];
    while (true) {
        input[0] = (Math.floor(Math.random() * 13 + 1));
        input[1] = (Math.floor(Math.random() * 13 + 1));
        input[2] = (Math.floor(Math.random() * 13 + 1));
        input[3] = (Math.floor(Math.random() * 13 + 1));
        solveEq();
        if (finalSolution != "No Solution")
            break;
    }
//    console.log(finalSolution);
/*    document.write("<div>");
    for (var x in input) {
        document.write(input[x] + " ");
    }
    document.write("</div>");*/

    var prefix = ["c", "s", "h", "d"];
    for (var i in input) {
        while (true) {
            var rand = Math.floor(Math.random() * 4);
            var name = prefix[rand] + input[i] + ".png";
            if ($.inArray(imageNames, name) === -1) {
                imageNames.push(name);
                break;
            }
        }
    }
    console.log(imageNames);
};

var calculate2x2 = function(pairNodes) {
    var solutions2x2 = [];

    // a to f
    for (var i = 0; i < 6; i++) {
        for (var j = 30; j < 36; j++) {
            solutions2x2 = solutions2x2.concat(performOperations(pairNodes[i], pairNodes[j], null));
        }
    }

    //b to e
    for (var i = 6; i < 12; i++) {
        for (var j = 24; j < 30; j++) {
            solutions2x2 = solutions2x2.concat(performOperations(pairNodes[i], pairNodes[j], null));
        }
    }

    //c to d
    for (var i = 12; i < 18; i++) {
        for (var j = 18; j < 24; j++) {
            solutions2x2 = solutions2x2.concat(performOperations(pairNodes[i], pairNodes[j], null));
        }
    }
    return solutions2x2;
};

var calculate3x1 = function(pairNodes, baseNodes) {
    var solutions3x1 = [];

    var map = {A:[2,3], B:[1,3], C:[1,2], D:[0,3], E:[0,2], F:[0,1]};

    for (var i in pairNodes) {
        var node = pairNodes[i];
        var vals = map[node.group];
        //forward
        var temp = performOperations(node, baseNodes[vals[0]], null);

        for (var j in temp) {
            solutions3x1 = solutions3x1.concat(performOperations(temp[j], baseNodes[vals[1]], null));
        }

        //backward
        var temp = performOperations(node, baseNodes[vals[1]], null);

        for (var j in temp) {
            solutions3x1 = solutions3x1.concat(performOperations(temp[j], baseNodes[vals[0]], null));
        }
    }

//    for (var i in solutions3x1) {
//        document.write("<div>" + solutions3x1[i].printNode() + "</div>");
//    }
    return solutions3x1;
};

var findSolution = function(solutions) {
    for (var i in solutions) {
        if (solutions[i].value === 24.0) {
            return solutions[i];
        }
    }
    return null;
};

var performOperations = function(a, b, group) {
    var temp = [];
    temp.push(new Node(a, b, "ADD", group, null));
    temp.push(new Node(a, b, "SUBTRACT", group, null));
    temp.push(new Node(b, a, "SUBTRACT", group, null));
    temp.push(new Node(a, b, "MULTIPLY", group, null));
    temp.push(new Node(a, b, "DIVIDE", group, null));
    temp.push(new Node(b, a, "DIVIDE", group, null));
    return temp;
};

var getCat = function(i) {
    switch (i) {
        case 1: return "A";
        case 2: return "B";
        case 3: return "C";
        case 4: return "D";
        case 5: return "E";
        case 6: return "F";
    }
    return null;
};

