import config.Category;
import config.Operation;

import java.util.ArrayList;

public class Solver {

    public ArrayList<Node> baseNodes;
    public ArrayList<Node> pairNodes;
    public int a, b, c, d;

    public ArrayList<Node> solutions2x2;

    public boolean solve(int a, int b, int c, int d){
        //create base
        baseNodes = new ArrayList<Node>();
        baseNodes.add(new Node(a));
        baseNodes.add(new Node(b));
        baseNodes.add(new Node(c));
        baseNodes.add(new Node(d));

        createPairNodes();

        calculate2x2();

        Node sol = findSolution();
        System.out.println(sol.getEq());

        return sol != null;
    }

    private void calculate2x2() {
        solutions2x2 = new ArrayList<Node>();

        for (int i = 0; i < 30; i++) {
            for (int j = i+1; j < 36; j++) {
                Node a = pairNodes.get(i);
                Node b = pairNodes.get(j);
                if (a.group == b.group) {
                    continue;
                } else {
                    solutions2x2.add(new Node(a, b, Operation.ADD, null));
                    solutions2x2.add(new Node(a, b, Operation.SUBTRACT, null));
                    solutions2x2.add(new Node(b, a, Operation.SUBTRACT, null));
                    solutions2x2.add(new Node(a, b, Operation.MULTIPLY, null));
                    solutions2x2.add(new Node(a, b, Operation.DIVIDE, null));
                    solutions2x2.add(new Node(b, a, Operation.DIVIDE, null));
                }
            }
        }
    }

    private void createPairNodes() {
        pairNodes = new ArrayList<Node>();
        for (int i = 0; i < 3; i++) {
            for (int j = i+1; j < 4; j++) {
                Node aa = baseNodes.get(i);
                Node bb = baseNodes.get(j);
                pairNodes.add(new Node(aa, bb, Operation.ADD, getCat(i+j)));
                pairNodes.add(new Node(aa, bb, Operation.SUBTRACT, getCat(i+j)));
                pairNodes.add(new Node(bb, aa, Operation.SUBTRACT, getCat(i+j)));
                pairNodes.add(new Node(aa, bb, Operation.MULTIPLY, getCat(i+j)));
                pairNodes.add(new Node(aa, bb, Operation.DIVIDE, getCat(i+j)));
                pairNodes.add(new Node(bb, aa, Operation.DIVIDE, getCat(i+j)));
            }
        }

/*        System.out.println(pairNodes.size());
        for (Node n : pairNodes) {
            n.printNode();
        }*/
    }

    private Node findSolution() {
        for (Node n : solutions2x2) {
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