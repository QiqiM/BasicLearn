#### 对象的扩展

##### 1.属性的简洁表示法
> es6允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。(下面代码中，变量`foo`直接写在大括号中，属性名就是变量名，属性值就是变量值)

```js
let foo = 'bar';
let baz = { foo };

// <===>
let baz = {foo: foo};
```
> 除了属性，方法也可以简写

```js
let o = {
    method() {
        return "test"
    }
}

// <==>
let o = {
    method: function(){
        return "test";
    }
}
```