class Solution {
    constructor(element) {
        this.list_0 = []
        this.list_1 = []
    }

    init() {
        for (let i = 1; i <= 19; i++) {            
            this.list_0.push(i);            
            this.list_1.push(i);        
        }        
        for (let i = 20; i <= 24; i++) {            
            this.list_0.push(i);            
            this.list_1.push(i + 6);        
        }        
        this.list_0.push(25);        
        this.list_1.push(25);        
        for (let i = 31; i <= 33; i++) {            
            this.list_0.push(i);            
            this.list_1.push(i);        
        }
    }

    find_index(position) {        
        if (position <= 25)        
            return position - 1;        
        else if (position <= 30)        
            return position - 7;        
        else        
            return position - 6;    
    }

    find_next_node(position, step) {       
        let list = this.list_0;
        if (position === 19 || position === 25 ||
            (position >= 26 && position <= 30)) {
            list = this.list_1;        
        }        
        let index = this.find_index(position);        
        index = (index + step + list.length) % list.length;        
        // return list[index];

        console.log(list[index])
    }
}

let solution = new Solution()
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
solution.find_next_node(22, 2);
solution.find_next_node(22, -2);
solution.find_next_node(27, 5);
solution.find_next_node(21, 3);
solution.find_next_node(26, 3);