//通用代码 (极简主义写法)
let observer = {
    //订阅
    addSubscriber: function (callback) {
        this.subscribers[this.subscribers.length] = callback;
    },

    //退订
    removeSubscriber: function (callback) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete (this.subscribers[i]);
            }
        }
    },

    //发布
    publish: function (what) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](what);
            }
        }
    },

    // 将对象o具有观察者功能
    make: function (o) { 
        for (let i in this) {
            o[i] = this[i];
            o.subscribers = [];
        }
    }
};

let blogger = {
    recommend: function (id) {
        let msg = 'dudu 推荐了的帖子:' + id;
        this.publish(msg);
    }
};

let user = {
    vote: function (id) {
        let msg = '有人投票了!ID=' + id;
        this.publish(msg);
    }
};

observer.make(blogger);
observer.make(user);


let tom = {
    read: function (what) {
        console.log('Tom看到了如下信息：' + what)
    }
};

let mm = {
    show: function (what) {
        console.log('mm看到了如下信息：' + what)
    }
};
// 订阅
blogger.addSubscriber(tom.read);
blogger.addSubscriber(mm.show);
blogger.recommend(123); //调用发布

//退订
blogger.removeSubscriber(mm.show);
blogger.recommend(456); //调用发布

//另外一个对象的订阅
user.addSubscriber(mm.show);
user.vote(789); //调用发布


// es6类的写法
class User{
    constructor(name,age){//构造函数
        this.name = name;
        this.age = age;
    }

    info(){
        console.log(`hi,my name is ${this.name},have ${this.age} years old!`);
    }

    //静态方法，只能是类调用
    static desc(){
        console.log('I am learning es6!');
    }

    //设置属性
    set github(val){
        this.githubname = val;
    }

    //获取属性
    get github(){
        return `https://github.com/${this.githubname}`;
    }
}

const person1 = new User('张三',20);
const person2 = new User('李四',15);
person1.info();
User.desc()