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
person1.githubname = "yato"
console.log(person1.githubname)
