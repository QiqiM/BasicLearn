class ListNode {
    constructor(element) {
        this.element = element
        this.prev = null
        this.next = null
    }
}

class LinkedList {
    constructor(element) {
        this.start = null;
        this.nodes = []
    }

    init() {
        this.start = new ListNode(1)
        this.nodes.push(this.start)
        let curNode = this.start;

        let curValue = 1;
        while (true) {
            curValue++;
            let node = new ListNode(curValue);
            this.nodes.push(node);
            curNode.next = node;
            node.prev = curNode;
            curNode = node;
            if (node.element >= 33) {
                curNode.next = this.start;
                this.start.prev = curNode
                break;
            }
        }

        this.find(31).prev = this.find(25);
        this.find(25).next = this.find(31);
        this.find(30).next = this.find(25);
        this.find(26).prev = this.find(19);
    }

    find(idx) {
        return this.nodes[idx - 1]
    }

    find_next_node(current_position, step) {
        if (current_position === 19) {
            this.find(19).next = this.find(26)
        } else {
            this.find(19).next = this.find(20)
        }

        if (current_position === 25) {
            this.find(25).prev = this.find(30)
        } else {
            this.find(25).prev = this.find(24)
        }

        let forward = step > 0 ? true : false; // true 前进， false后退 
        let currentNode = this.find(current_position)
        step = Math.abs(step);

        for (let i = 0; i < step; i++) {
            currentNode = forward ? currentNode.next : currentNode.prev
        }

        console.log(currentNode.element)
    }
}

let solution = new LinkedList()
solution.init()
solution.find_next_node(1, 4);
solution.find_next_node(5, -4);
solution.find_next_node(17, 5);
solution.find_next_node(19, 2);
solution.find_next_node(27, -3);
solution.find_next_node(30, 3);
solution.find_next_node(32, -4);
solution.find_next_node(25, -2);
solution.find_next_node(33, 3);
solution.find_next_node(1, -2);