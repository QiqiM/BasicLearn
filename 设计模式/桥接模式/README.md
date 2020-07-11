#### 桥接模式

#### 桥接模式的定义
> 桥接模式（Bridge）将抽象部分与它的实现部分分离，使他们都可以独立变化。

#### 使用场合
> 不希望使用继承或者因为多继承导致类爆炸的系统；

#### 优缺点
> 优点： 实现了抽象与实现部分的分离，提高了系统的灵活性；替代了多层继承方案，减少了子类的个数

> 缺点： 增加了系统的复杂度；要求正确识别出系统中两个独立变化的维度，适用范围有一定的局限性


#### 桥接模式主要有4个角色组成：
+ 抽象类
+ 扩充抽象类
+ 实现类接口
+ 具体实现类
> 根据javascript语言的特点，我们将其简化成2个角色：

+ 扩充抽象类
+ 具体实现类

#### 最简单的桥接模式
其实我们最经常用的jQuery的each函数就是一个典型的桥接模式，我们模拟其实现如下：

```js
var each = function (arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        if (fn.call(val, i, val, arr)) {
            return false;
        }
    }
}
var arr = [1, 2, 3, 4];
each(arr, function (i, v) {
    arr[i] = v * 2;
})
```

在这个例子中，我们通过函数循环了arr数组。在这个例子中，抽象部分是`each()`函数，也就是上面的扩充抽象类，实现部分就是`function(i,v){}`,即具体实现类。抽象部分和实现部分可以独立的进行变化。这个例子虽然简单，但是一个典型的桥接模式的应用。

#### 插件开发中的桥接模式
桥接模式的一个使用场景是组件开发，我们平时开发组件为了适应不同场合，组件相应的会有许多不同维度的变化。桥接模式就可以应用于此，将抽象与实现分离，是组件的扩展性更高。假设我们要开发一个弹窗插件，弹窗有不同的类型:普通消息提醒，错误提醒，每一种提醒的展示方式还都不一样。这是一个典型的多维度变化的场景。首先我们定义两个类:普通消息弹窗和错误消息弹窗

```js
class Base {
    constructor(animation) {
        this.animation = animation;
    }

    show() {
        this.animation.show();
    }
}

class MessageDialog extends Base {
    constructor(animation) {
        super(animation);
    }
}

class ErrorDialog extends Base {
    constructor(animation) {
        super(animation);
    }
}
```

这两个类就是前面提到的抽象部分，也就是扩充抽象类，他们都包含一个成员animation。两种弹窗通过show方法进行展示，但是显示的动画效果不同。我们定义两种效果类如下：
```js
class LineAnimation {
    constructor() {}

    show() {
        console.log("it is liner");
    }
}

class EaseAnimation {
    constructor() {}

    show() {
        console.log("it is ease");
    }
}
```
这两个类就是具体实现类，它们实现具体的显示效果。使用方式如下
```js
let message = new MessageDialog(new LineAnimation());
message.show();
let errorMsg = new ErrorDialog(new EaseAnimation());
errorMsg.show();
```

#### 总结
学习桥接模式关键是要理解抽象部分与实现部分的分离，使得二者可以独立的变化，而不必拘泥于形式。JS插件灵活的变化，适应场景的多变就非常适合这种模式来实现。使用桥接模式最重要的是找出系统中的不同的变化维度。




