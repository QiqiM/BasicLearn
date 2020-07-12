abstract class Component {
    protected name : string;
    constructor(name : string) {
        this.name = name;
    }

    public abstract doOperation() : void;

    public add(component : Component) : void {

    }

    public remove(component : Component) : void {

    }

    public getChildren() : Array<Component> {
        return [];
    }
}

class Composite extends Component {
    // 构件容器
    private componentList : any;
    constructor(name : string) {
        super(name);
        this.componentList = [];
    }

    public doOperation() : void {
        console.log(`这是容器${this.name}，处理一些逻辑业务！`);
    }

    public add(component : Component) : void {
        this.componentList.push(component);
    }

    public remove(component : Component) : void {
        const componentIndex = this.componentList.findIndex((value : Component, index : Number) => {
            return value == component;
        });
        this.componentList.splice(componentIndex, 1);
    }

    public getChildren() : Array<Component> {
        return this.componentList;
    }
}

class Leaf extends Component {
    constructor(name : string) {
        super(name);
    }

    public doOperation() : void {
        console.log(`这是叶子节点${this.name}，处理一些逻辑业务！`);
    }
}

function main() {
    const root : Component  = new Composite('root');
    const node1 : Component = new Leaf('1');
    const node2 : Component = new Composite('2');
    const node3 : Component = new Leaf('3');

    root.add(node1);
    root.add(node2);
    root.add(node3);

    const node2_1 : Component = new Leaf("2_1");
    node2.add(node2_1);

    const children1 = root.getChildren();
    console.log(children1);

    root.remove(node2);

    const children2 = root.getChildren();
    console.log(children2);
}

main();