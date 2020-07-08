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


// 另一种写法
// 主题 保存状态，状态变化之后触发所有观察者对象
class Subject {
    constructor() {
      this.state = 0
      this.observers = []
    }
    getState() {
      return this.state
    }
    setState(state) {
      this.state = state
      this.notifyAllObservers()
    }
    notifyAllObservers() {
      this.observers.forEach(observer => {
        observer.update()
      })
    }
    attach(observer) {
      this.observers.push(observer)
    }
  
  
    remove(observer){
      const observerIndex = this.observers.findIndex(value => {
          return value == observer;
      })
      observerIndex >= 0 && this.observers.splice(observerIndex, 1);
  };
  }
  
  // 观察者
  class Observer {
    constructor(name, subject) {
      this.name = name
      this.subject = subject
      this.subject.attach(this)
    }
    update() {
      console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
  
    remove(){
      this.subject.remove(this)
    }
  }
  
  // 测试
  let s = new Subject()
  let o1 = new Observer('o1', s)
  let o2 = new Observer('o2', s)
  
  s.setState(12)
  // o1 update, state: 12
  // o2 update, state: 12
  
  o2.remove()
  s.setState(11) 
  // o1 update, state: 11
  