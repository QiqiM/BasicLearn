// 基类
class Component{
    constructor(name){
        this.name = name;
    }

    
    add(component) {

    }

    remove(component) {

    }

    getChildren() {
        return [];
    }
}

class Composite extends Component {
    // 构件容器
    constructor(name) {
        super(name);
        this.componentList = [];
    }

    doOperation() {
        console.log(`这是容器${this.name}，处理一些逻辑业务！`);
    }

    add(component){
        this.componentList.push(component);
    }

    remove(component) {
        const componentIndex = this.componentList.findIndex((value, index ) => {
            return value == component;
        });
        this.componentList.splice(componentIndex, 1);
    }

    getChildren() {
        return this.componentList;
    }
}

class Leaf extends Component {
    constructor(name) {
        super(name);
    }

    doOperation(){
        console.log(`这是叶子节点${this.name}，处理一些逻辑业务！`);
    }
}

function main() {
    const root = new Composite('root');
    const node1  = new Leaf('1');
    const node2  = new Composite('2');
    const node3  = new Leaf('3');

    root.add(node1);
    root.add(node2);
    root.add(node3);

    const node2_1 = new Leaf("2_1");
    node2.add(node2_1);

    const children1 = root.getChildren();
    console.log(children1);

    console.log("=============================")

    root.remove(node2);

    const children2 = root.getChildren();
    console.log(children2);
}

main();

// [ Leaf { name: '1' },
//   Composite { name: '2', componentList: [ [Leaf] ] },
//   Leaf { name: '3' } ]
// =============================
// [ Leaf { name: '1' }, Leaf { name: '3' } ]