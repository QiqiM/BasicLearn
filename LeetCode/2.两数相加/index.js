// ListNode class
function ListNode(element) {
    this.element = element
    this.next = null
}

// LinkList class
function LinkList() {
    this.head = new ListNode('head'); //头节点
    this.find = find;               //查找节点
    this.insert = insert;           //插入节点
    this.remove = remove;           //删除节点
    this.findPrev = findPrev;       //查找前一个节点
    this.display = display;         //显示链表
}

//查找节点
function find(item) {
    var currNode = this.head
    while (currNode.element !== item) {
        currNode = currNode.next
    }
    return currNode
}

//插入节点(尾插法)
function insert(newElement, item) {
    var newNode = new ListNode(newElement)
    var currNode = this.find(item)
    newNode.next = currNode.next
    currNode.next = newNode
}

//删除节点
function remove(item) {
    var prevNode = this.findPrev(item)
    var currNode = this.find(item)
    if (prevNode.next !== null) {
        prevNode.next = prevNode.next.next
        currNode.next = null
    }

}

//查找前一个节点
function findPrev(item) {
    var currNode = this.head
    while (currNode.next !== null && currNode.next.element !== item) {
        currNode = currNode.next
    }
    return currNode
}

//显示链表
function display() {
    var currNode = this.head
    while (currNode.next !== null) {
        currNode = currNode.next
        console.log(currNode.element)
    }
}

var list1 = new LinkList()
list1.insert(2, 'head')
list1.insert(4, 2)
list1.insert(3, 4)
list1.display()

var list2 = new LinkList()
list2.insert(5, 'head')
list2.insert(6, 5)
list2.insert(4, 6)
list2.display()


let addTwoNumbers = function(l1, l2) {
    let p1 = l1.head.next
    console.log(l1)
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
        console.log(`point=============${pointer.element}`)
        console.log(`dummy=============${dummy.next.element}`)
    }

    console.log(dummy.next)
    return dummy.next  
};

let result = addTwoNumbers(list1,list2)
console.log(result.element)
console.log(result.next.element)
console.log(result.next.next.element)
