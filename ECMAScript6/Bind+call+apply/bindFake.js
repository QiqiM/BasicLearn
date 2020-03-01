/*  
===============第二步=================
var obj = {};
console.log(obj);
console.log(typeof Function.prototype.bind); // function
console.log(typeof Function.prototype.bind());  // function
console.log(Function.prototype.bind.name);  // bind
console.log(Function.prototype.bind().name);  // bound 
*/


/* 
===============第二步=================
let obj = {
    name: "yato"
}

function original(a,b){
    console.log(this.name)
    console.log([a,b])
    return false
}

let bound = original.bind(obj, 1)
let boundInvoke = bound(2)                    // 'yato', Array(2)[1,2]

console.log(boundInvoke)                       // false
console.log(original.bind.name)                // bind
console.log(original.bind.length)              // 1
console.log(original.bind().length)            // 2 返回original函数形参个数
console.log(bound.name)                        // 'bound original'
console.log((function(){}).bind().name)        // 'bound '
console.log((function(){}).bind().length)      // 0 
*/

/* 
// 第一版 修改this指向，合并参数
Function.prototype.bindFn = function bindFake(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + 'must be a function')
    }

    // 存储函数本身的this引用
    let self  = this
    
    // 去除thisArg的其他参数，转成数组
    let args = [].slice.call(arguments, 1)
    let bound = function(){
        // bind 返回的函数，也就是bound，在程序中被调用时传递的参数转成数组
        let boundArg = [].slice.call(arguments);

        // apply修改this指向，把两个函数的参数合并传给self函数，返回执行结果
        return self.apply(thisArg, args.concat(boundArg))
    }

    return bound
}

// Test
let obj = {
    name: 'yato'
}

function original(a, b){
    console.log(this.name)
    console.log([a,b])
}

let bound = original.bindFn(obj, 1)
bound(2);    // 'yato', [1,2]
 */


/* 
 // ===============第三步================
 let obj = {name : 'yato'}

 function original(a, b){
     console.log('this : ', this)
     console.log('typeof this : ', typeof this)
     this.name = b
     console.log('name: ', this.name)
     console.log('this: ', this)
     console.log([a,b])
 }

 let bound = original.bind(obj, 1)
 let newBoundInvoke = new bound(2)
 console.log('newBoundInvoke: ', newBoundInvoke)
  */


// 第二版 实现new调用
Function.prototype.bindFn = function bindFake(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + ' must be a function')
    }

    // 存储调用bind的函数本身的引用
    let self = this

    // 去除thisArg参数，其他转成数组
    let args = [].slice.call(arguments, 1)
    let bound = function(){
        let boundArgs = [].slice.call(arguments)
        let finalArgs = args.concat(boundArgs)

        // new 调用时，其实this instanceof bound 判断不是很准确。es6
        // new.target就是解决这一问题的
        if(this instanceof bound){
            // 这里是实现上文描述的 new 的第 1, 2, 4 步
            // 1.创建一个全新的对象
            // 2.并且执行[[Prototype]]链接
            // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
            // self可能是ES6的箭头函数，没有prototype，所以就没必要再指向做prototype操作。
            if(self.prototype){
                function Empty(){}
                Empty.prototype = self.prototype
                bound.prototype = new Empty()
            }

            // 这里实现的时上文描述的第三步
            // 3.生成的新对象会绑定到函数调用的this
            let result = self.apply(this, finalArgs);

            // 这里是实现上文描述的 new 的第 5 步
            // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，
            // 那么`new`表达式中的函数调用会自动返回这个新的对象。
            let isObject = typeof result === 'object' && result !== null
            let isFunction = typeof result === 'function'

            if(isObject || isFunction)
                return result

            return this
        }else{
            // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
            return self.apply(thisArg, finalArgs)
        }
    }
    return bound
}

// Test
let obj = {name : 'yato'}

function original(a, b){
    console.log('this : ', this)
    console.log('typeof this : ', typeof this)
    this.name = b
    console.log('name: ', this.name)
    console.log('this: ', this)
    console.log([a,b])
}

let bound = original.bindFn(obj, 1)
let newBoundInvoke = new bound(2)
console.log('newBoundInvoke: ', newBoundInvoke)