import config.Category;
import config.Operation;

import java.util.ArrayList;
import java.util.HashMap;

public class Solver {

    public ArrayList<Node> baseNodes;
    public ArrayList<Node> pairNodes;
    public int a, b, c, d;

    public ArrayList<Node> solutions2x2;
    public ArrayList<Node> solutions3x1;

    public boolean solve(int a, int b, int c, int d){
        //create base
        baseNodes = new ArrayList<Node>();
        baseNodes.add(new Node(a));
        baseNodes.add(new Node(b));
        baseNodes.add(new Node(c));
        baseNodes.add(new Node(d));

        createPairNodes();

        calculate2x2();
        calculate3x1();
        Node sol = findSolution();
//        System.out.println(sol.getEq());
        sol.printNode();
        return sol != null;
    }

    private void calculate3x1() {
        solutions3x1 = new ArrayList<Node>();

        HashMap<Category, Integer[]> map = new HashMap<Category, Integer[]>();
        map.put(Category.GROUP_A, new Integer[]{2, 3});
        map.put(Category.GROUP_B, new Integer[]{1, 3});
        map.put(Category.GROUP_C, new Integer[]{1, 2});
        map.put(Category.GROUP_D, new Integer[]{0, 3});
        map.put(Category.GROUP_E, new Integer[]{0, 2});
        map.put(Category.GROUP_F, new Integer[]{0, 1});

        for (Node node : pairNodes) {
            Integer[] vals = map.get(node.group);
            //forward
            ArrayList<Node> temp = new ArrayList<Node>();
            temp.add(new Node(node, baseNodes.get(vals[0]), Operation.ADD, null));
            temp.add(new Node(node, baseNodes.get(vals[0]), Operation.SUBTRACT, null));
            temp.add(new Node(baseNodes.get(vals[0]), node, Operation.SUBTRACT, null));
            temp.add(new Node(node, baseNodes.get(vals[0]), Operation.MULTIPLY, null));
            temp.add(new Node(node, baseNodes.get(vals[0]), Operation.DIVIDE, null));
            temp.add(new Node(baseNodes.get(vals[0]), node, Operation.DIVIDE, null));

            for (Node three : temp) {
                solutions3x1.add(new Node(three, baseNodes.get(vals[1]), Operation.ADD, null));
                solutions3x1.add(new Node(three, baseNodes.get(vals[1]), Operation.SUBTRACT, null));
                solutions3x1.add(new Node(baseNodes.get(vals[1]), three, Operation.SUBTRACT, null));
                solutions3x1.add(new Node(three, baseNodes.get(vals[1]), Operation.MULTIPLY, null));
                solutions3x1.add(new Node(three, baseNodes.get(vals[1]), Operation.DIVIDE, null));
                solutions3x1.add(new Node(baseNodes.get(vals[1]), three, Operation.DIVIDE, null));
            }

            //backward
            temp = new ArrayList<Node>();
            temp.add(new Node(node, baseNodes.get(vals[1]), Operation.ADD, null));
            temp.add(new Node(node, baseNodes.get(vals[1]), Operation.SUBTRACT, null));
            temp.add(new Node(baseNodes.get(vals[1]), node, Operation.SUBTRACT, null));
            temp.add(new Node(node, baseNodes.get(vals[1]), Operation.MULTIPLY, null));
            temp.add(new Node(node, baseNodes.get(vals[1]), Operation.DIVIDE, null));
            temp.add(new Node(baseNodes.get(vals[1]), node, Operation.DIVIDE, null));

            for (Node three : temp) {
                solutions3x1.add(new Node(three, baseNodes.get(vals[0]), Operation.ADD, null));
                solutions3x1.add(new Node(three, baseNodes.get(vals[0]), Operation.SUBTRACT, null));
                solutions3x1.add(new Node(baseNodes.get(vals[0]), three, Operation.SUBTRACT, null));
                solutions3x1.add(new Node(three, baseNodes.get(vals[0]), Operation.MULTIPLY, null));
                solutions3x1.add(new Node(three, baseNodes.get(vals[0]), Operation.DIVIDE, null));
                solutions3x1.add(new Node(baseNodes.get(vals[0]), three, Operation.DIVIDE, null));
            }
        }
    }

    private void calculate2x2() {
        solutions2x2 = new ArrayList<Node>();

        // a to f
        for (int i = 0; i < 6; i++) {
            for (int j = 30; j < 36; j++) {
                Node a = pairNodes.get(i);
                Node b = pairNodes.get(j);
                solutions2x2.add(new Node(a, b, Operation.ADD, null));
                solutions2x2.add(new Node(a, b, Operation.SUBTRACT, null));
                solutions2x2.add(new Node(b, a, Operation.SUBTRACT, null));
                solutions2x2.add(new Node(a, b, Operation.MULTIPLY, null));
                solutions2x2.add(new Node(a, b, Operation.DIVIDE, null));
                solutions2x2.add(new Node(b, a, Operation.DIVIDE, null));
            }
        }

        //b to e
        for (int i = 6; i < 12; i++) {
            for (int j = 24; j < 30; j++) {
                Node a = pairNodes.get(i);
                Node b = pairNodes.get(j);
                solutions2x2.add(new Node(a, b, Operation.ADD, null));
                solutions2x2.add(new Node(a, b, Operation.SUBTRACT, null));
                solutions2x2.add(new Node(b, a, Operation.SUBTRACT, null));
                solutions2x2.add(new Node(a, b, Operation.MULTIPLY, null));
                solutions2x2.add(new Node(a, b, Operation.DIVIDE, null));
                solutions2x2.add(new Node(b, a, Operation.DIVIDE, null));
            }
        }

        //c to d
        for (int i = 12; i < 18; i++) {
            for (int j = 18; j < 24; j++) {
                Node a = pairNodes.get(i);
                Node b = pairNodes.get(j);
                solutions2x2.add(new Node(a, b, Operation.ADD, null));
                solutions2x2.add(new Node(a, b, Operation.SUBTRACT, null));
                solutions2x2.add(new Node(b, a, Operation.SUBTRACT, null));
                solutions2x2.add(new Node(a, b, Operation.MULTIPLY, null));
                solutions2x2.add(new Node(a, b, Operation.DIVIDE, null));
                solutions2x2.add(new Node(b, a, Operation.DIVIDE, null));
            }
        }

//        System.out.println(solutions2x2.size());
    }

    private void createPairNodes() {
        pairNodes = new ArrayList<Node>();
        int counter = 1;
        for (int i = 0; i < 3; i++) {
            for (int j = i+1; j < 4; j++) {
                Node aa = baseNodes.get(i);
                Node bb = baseNodes.get(j);
                pairNodes.add(new Node(aa, bb, Operation.ADD, getCat(counter)));
                pairNodes.add(new Node(aa, bb, Operation.SUBTRACT, getCat(counter)));
                pairNodes.add(new Node(bb, aa, Operation.SUBTRACT, getCat(counter)));
                pairNodes.add(new Node(aa, bb, Operation.MULTIPLY, getCat(counter)));
                pairNodes.add(new Node(aa, bb, Operation.DIVIDE, getCat(counter)));
                pairNodes.add(new Node(bb, aa, Operation.DIVIDE, getCat(counter)));
                counter++;
            }
        }

//        System.out.println(pairNodes.size());
//        for (Node n : pairNodes) {
//            n.printNode();
//        }
    }

    private Node findSolution() {
        for (Node n : solutions2x2) {
            if ((int) n.base == 24) {
                return n;
            }
        }

        for (Node n : solutions3x1) {
            if ((int) n.base == 24) {
                return n;
            }
        }
        return null;
    }


    private Category getCat(int i) {
        switch (i) {
            case 1: return Category.GROUP_A;
            case 2: return Category.GROUP_B;
            case 3: return Category.GROUP_C;
            case 4: return Category.GROUP_D;
            case 5: return Category.GROUP_E;
            case 6: return Category.GROUP_F;
        }
        return null;
    }


}