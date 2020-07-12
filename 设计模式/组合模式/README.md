#### 组合模式

#### 组合模式的定义

> 也叫合成模式或部分-整体模式，主要用来描述部分和整体的关系，将对象组合成树形结构以表示"部分-整体"的层次结构，使得用户对单个对象和组合对象的使用具有一致性。

#### 使用场合

> 维护和展示部分-整体关系的场景，如树形菜单、文件和文件夹管理

#### 优缺点

> 优点： 调用简单，只需要面对一致的对象而不用考虑整体部分或者叶子节点的问题；扩展性强，一方面，当更改组合对象的时候，只需要调整内部的层次关系，用户不用做出任何改动，另一方面，容易增加节点，只要找到他的父节点即可

> 缺点： 要求较高的抽象性，如果节点和叶子节点有很多差异的话（比如很多方法和属性不一样），不适合使用组合模式。
#### 代码实现

```js
// 基类
class Component {
    constructor(name) {
        this.name = name;
    }

    add(component) {}

    remove(component) {}

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

    add(component) {
        this.componentList.push(component);
    }

    remove(component) {
        const componentIndex = this.componentList.findIndex((value, index) => {
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

    doOperation() {
        console.log(`这是叶子节点${this.name}，处理一些逻辑业务！`);
    }
}

function main() {
    const root = new Composite("root");
    const node1 = new Leaf("1");
    const node2 = new Composite("2");
    const node3 = new Leaf("3");

    root.add(node1);
    root.add(node2);
    root.add(node3);

    const node2_1 = new Leaf("2_1");
    node2.add(node2_1);

    const children1 = root.getChildren();
    console.log(children1);

    console.log("=============================");

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
```
