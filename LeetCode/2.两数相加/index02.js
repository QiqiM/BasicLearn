class ListNode{
    constructor(element){
        this.element = element
        this.next = null
    }
}

class LinkList{
    constructor(){
        this.head = new ListNode('head')
    }

    //查找节点
    find(item){
        var currNode = this.head
        while (currNode.element !== item) {
            currNode = currNode.next
        }
        return currNode
    }

    //插入节点(尾插法)
    insert(newElement, item) {
        var newNode = new ListNode(newElement)
        var currNode = this.find(item)
        newNode.next = currNode.next
        currNode.next = newNode
    }

    //删除节点
    remove(item) {
        var prevNode = this.findPrev(item)
        var currNode = this.find(item)
        if (prevNode.next !== null) {
            prevNode.next = prevNode.next.next
            currNode.next = null
        }

    }

    //查找前一个节点
    findPrev(item) {
        var currNode = this.head
        while (currNode.next !== null && currNode.next.element !== item) {
            currNode = currNode.next
        }
        return currNode
    }

    //显示链表
    display() {
        var currNode = this.head
        while (currNode.next !== null) {
            currNode = currNode.next
            console.log(currNode.element)
        }
    }

    static addTwoNumbers(l1, l2) {
        let p1 = l1.head.next
        // console.log(l1)
        let p2 = l2.head.next
        let carry = 0
        const dummy = new ListNode()
        let pointer = dummy
        while (p1 || p2 || carry) {
            const num1 = p1 ? p1.element : 0
            const num2 = p2 ? p2.element : 0
            const sum = num1 + num2 + carry
            if (sum > 9) {
                pointer.next = new ListNode(sum % 10)
                carry = 1
            } else {
                pointer.next = new ListNode(sum)
                carry = 0
            }
            if (p1) {
                p1 = p1.next
            }
    
            if (p2) {
                p2 = p2.next
            }
            pointer = pointer.next
            // console.log(`point=============${pointer.element}`)
            // console.log(`dummy=============${dummy.next.element}`)
        }
    
        // console.log(dummy.next)
        return dummy.next
    };
}

module.exports = LinkList;