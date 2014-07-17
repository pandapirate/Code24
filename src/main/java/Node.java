import config.Category;
import config.Operation;

public class Node {

    public Node A, B;
    public Operation op;
    public double a, b, base;
    public Category group;

    public Node(int value) {
        base = value;
    }

    public Node(Node a, Node b, Operation op, Category g) {
        this.A = a;
        this.B = b;
        this.a = a.base;
        this.b = b.base;
        this.op = op;
        this.group = g;

        switch (op) {
            case ADD: this.base = this.a + this.b;
                break;
            case SUBTRACT: this.base = this.a - this.b;
                break;
            case MULTIPLY: this.base = this.a * this.b;
                break;
            case DIVIDE: this.base = this.a / this.b;
                break;
        }
    }

    public void printNode() {
        System.out.println(group + " " + A.getEq() + " " + translateOp() + " " + B.getEq() + " = " + base);
    }

    public String getEq() {
        if (A == null && B == null)
            return base + "";
        else
            return "(" + A.getEq() + " " + translateOp() + " " + B.getEq() + ")";
    }

    private String translateOp() {
        switch (op) {
            case ADD:
                return "+";
            case SUBTRACT:
                return "-";
            case MULTIPLY:
                return "*";
            case DIVIDE:
                return "/";
        }
        return "";
    }
}