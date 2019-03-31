# js问题总结

## javascript运行机制

### 一、javascript 是单线程的

- 原因：js的主要功能是与用户互动，以及操作DOM，如果Javascript同时又两个线程，一个线程在某个DOM节点上添加了内容，另一个线程删除了这个节点，这时浏览器无法判断要以哪个线程为准。
- html5：Web Worker标准，允许Javascript脚本创建多个线程，但是子线程完全受主线程，且不得操作DOM

### 二、任务队列

所有任务可以分为两种：

- 同步任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
- 异步任务：不进入主线程，而进入**”任务队列“**的任务，只有任务队列通知主线程，某个异步任务可以执行了，该任务才能进入主线程执行

只有在主线程为空的时候才会开始读取任务队列的任务

**任务队列**

1. 是一个事件的队列，IO设备完成一项任务，就在“任务队列”中添加一个事件，表示相关的异步任务可以进入“执行栈”了
2. 队列中的事件：IO事件、用户产生的事件等？？
3. 回调函数：被主线程挂起的代码，异步任务必须指定回调函数？？？，主线程开始执行异步任务，就是执行对应的回调函数
4. 结构：先进先出（定时器功能中，主线程首先检查执行时间，某些时间只有到了规定的时间，才能返回主线程

### 三、EventLoop

![1551765513516](C:\Users\张文玘\AppData\Roaming\Typora\typora-user-images\1551765513516.png)

```javascript
setTimeout(function(){ console.log(1); }, 0);
console.log(2);
```

上面代码的执行结果为2,1，因为只有执行完第二行之后，系统才回去执行“任务队列”中的回调函数

setTimeout(fn, 0)的含义是：指定某个任务在主线程最早可得的空闲时间执行，在“任务队列“的尾部添加一个事件

[注]

关于nodeJs部分的EventLoop可参照http://www.ruanyifeng.com/blog/2014/10/event-loop.html



### 扩展：关于定时器的一些其他知识点

1. setTimeout回调函数中如果没有使用箭头函数或其他方式进行绑定的话，默认作用域为window

```javascript
var obj = {
    say: function() {
        setTimeout(function() {
        	console.log(this)
        }, 1000)
    }
}
obj.say() // window
```

```javascript
var obj = {
    say: function() {
        setTimeout(() => {
            console.log(this)
        }, 1000)
    }
}
obj.say() // obj.say对象
```

2. 如何在一定时间间隔之后返回某个值

   1. callback回调：

      ```javascript
      checkOver(item, callback) {
          let check = false;
          setTimeout( () => {
              check = ...
              callback && callback()
          }, 1)
      }
      
      // 调用
      checkOver(item, function(check) {
      	console.log(check)
      })
      ```

      

   2. promise包装：

      ```javascript
      function checkOver(item) {
      	let check = false;
          let promise = new Promise(function(resolve, reject) {
              setTimeout(() => {
                  check = true;
                  resolve(check)
      		})
      	})
          return promise
      }
      
      // 调用
      checkOver(item).then((check) => {
          console.log(check)
      })
      ```



## js中的立即执行函数

**可以消除全局变量的影响**

**成员变量私有化**

js的对象就是一个map

```javascript
var car = {
    speed: 0,
    start: function() { this.speed = 40; },
    getspeed: function() { return this.speed; }
};
car.start();
console.log(car.getspeed());
```

这种方式下，speed是没有私有化的，我们可以随意的对speed进行修改，

如何通过成员变量私有化来实现对象的封装

```javascript
function car() {
	var speed = 0;
    return {
        start: function() {
            speed = 50;
        },
        getspeed: function() {
            return speed;
        }
    }
}

var car1 = car();
car1.start();
console.log(car1.getspeed())
```

使用闭包函数来创建car对象，这个函数就类似于工厂方法，可以根据需要创建多个不同的对象

**如何实现单例模式**

让这个函数能且只能被调用一次。

- 不能多次调用，那么这个函数一定是匿名函数
- 需要被调用一次，那么只能在创建的时候进行调用

```javascript
var car = (function () {
    var speed = 0;
    return {
        start:function () {
            speed=60;
        },
        getspeed:function () {
         return speed;
        }
    }
})();
 
car.start();
console.log(car.getspeed()); //print 60
```



## Promise相关

### 一、含义

简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

**特点**

1. 对象的状态不受外界影响，一个异步操作包括3种状态

   1. pending：进行中
   2. fulfilled：已成功
   3. rejected：已失败

   **只有异步操作**的结果可以改变这个状态，其他操作都无法改变

2. 一旦状态改变，就不会再变。状态改变的两种可能

   1. pending -> fulfilled
   2. pending -> rejected 

   处于fulfilled和rejected状态的Promise的状态就已经凝固了，统称为resolved

**优点**

1. 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
2. 提供统一的接口，使得控制异步操作更加容易

**缺点**

1. 无法取消，一旦新建就会立即执行，无法中途取消
2. 如果不设置回调函数，Promise内部抛出的错误，不会反映到外部
3. 处于pending状态时，无法得知目前进展到哪一个阶段

### 二、基本用法

```javascript
const promise = new Promise(function(resolve, reject) {
    if (/* 异步操作成功 */) {
        resolve(value); // 将Promise对象的状态：pending => resolved
	} else {
        reject(error); // pending => rejected             
    }
}).then(function(value) {
    // success
}, function(error) {
    // failure 可选的，不一定要提供
})
```

Promise**新建后立即**执行

```javascript
let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function() {
    console.log('resolved');
});

console.log('Hi!')

// Promise
// Hi!
// resolved
```

Promise新建后立即执行

then方法指定回调函数，在当前脚本所有同步任务执行完之后才会执行



### 三、Promise.prototype.catch

1. ```javascript
   // 写法一
   const promise = new Promise(function(resolve, reject) {
       try {
           throw new Error('test');
       } catch(e) {
           reject(e);
       }
   })
   promise.catch(function(error) {
       console.log(error)
   });
   
   
   // 写法二
   const promise = new Promise(function(resolve, reject) {
       reject(new Error('test'));
   });
   promise.catch(function(error) {
       console.log(error)
   })
   或者
   promise.then(() => { success }, (err) => { fail })
   ```

   [注]：如果Promise状态已经变成`resolved`，再抛出错误是无效的

2. ```javascript
   const promise = new Promise(function (resolve, reject) {
   	resolve('ok')
       setTimeout(function() { throw new Error('test') }, 0)
   });
   promise.then(function (value) { console.log(value) })
   ```

   上面代码中，Promise指定在**下一轮”事件循环“**再抛出错误。到那个时候，Promise的运行已经结束了，所以这个错误是在Promise函数体外抛出的，会冒泡到最外层，成了未捕获的错误。

3. catch方法中还能继续抛出错误，可以继续被后面的catch捕获
4. 如果抛出的错误没有被catch捕获，也不会传递到外层

### 四、Promise.prototype.finally()

```javascript
promise
.then(result => {...})
.catch(error => {...})
.finally(() => {...});
```

不管Promise对象最后状态如何，都会执行finally代码块中的代码

1. finally底层实现

```javascript
Promise.prototype.finally = function(callback) {
	let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    )
}
```

finally方法总是会返回原来的值

### 五、Promise.all()

```javascript
const p = Promise.all([p1, p2, p3])
```

- p1，p2，p3都是Promise实例，如果不是，就会先调用`Promise.resolve` 转换为Promise实例
- 参数可以不是数组，但是必须具有Iterator接口，且返回的每个成员都是Promise实例

p的状态由 p1、p2、p3 决定

- 只有p1 p2 p3的状态都变成`fulfilled`，p的状态才会变成fulfilled，此时p1,p2,p3的返回值组成一个数组，传递给p的回调函数
- 如果有某个被`rejected`，那么p也被rejected，此时第一个被`rejected`的实例的返回值会传递给p的回调函数

【注】如果作为参数的Promise实例自己定义了catch方法，那么它一旦被rejected，不会触发Promise.all()的catch方法

```javascript
const p1 = new Promise((resolve, reject) => {
	resolve('hello')
}).then(result => result)
.catch(e => e)

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了')
}).then(result => result)
.catch(e => e)

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e))
// ["hello", Error: 报错了]
```

p2实例执行完catch方法后，也会变成resolved，所以Promise.all接受到的两个Promise对象都是resolve状态的



### 六、Promise.race()

```javascript
const p = Promise.race([p1, p2, p3]);
```

只要p1, p2, p3之中有一个实例率先改变状态，p的状态就跟着改变，那个率先改变的Promise实例的返回值，就传递给p的回调函数

```javascript
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function(resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
])

p.then(console.log).catch(console.error)
```

如果5秒内fetch方法没有返回结果，那么p就会变成rejected，触发catch方法

### 七、Promise.resolve()

将现有对象转为Promise对象

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

四种情况：

1. 参数是一个Promise实例

2. 参数是一个`thenable`对象

   thenable对象：具有`then`方法的对象

   Promise.resolve方法会将这个对象转为Promise对象，然后立即执行thenable对象的then方法

   ```javascript
   let thenable = {
       then: function(resolve, reject) {
           resolve(42);
       }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
   	console.log(value); // 42
   })
   ```

   

3. 参数不是具有then方法的对象，或根本就不是对象

   ```javascript
   const p = Promise.resolve('Hello');
   p.then(function (s) {
   	console.log(s)
   });
   // Hello
   ```

4. 不带有任何参数：可以用于得到一个Promise对象

立即resolve的Promise对象，是在**本轮“事件循环”**的结束时，而不是在下一轮“事件循环”的开始时

```javascript
setTimeout(function() {
    console.log('three')
}, 0);

Promise.resolve().then(function() {
    console.log('two')
});

console.log('one')

// one
// two
// three
```

### 八、Promise.reject()

```javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true

```

http://www.fly63.com/article/detial/87



### fetch、axios、fly

#### axios

原生XHR封装，通过Promise实现

优点：

1. 可以取消请求

![1551779956502](C:\Users\张文玘\AppData\Roaming\Typora\typora-user-images\1551779956502.png)

2. 基于XHR，兼容性更好
3. 并发请求（感觉就是用了Promise.all
4. 可以配置拦截器（感觉fetch也可以通过封装实现这个功能

#### fetch

与XHR同级，是ES规范里新的实现方式，原生支持异步流（promise）模型

优点：

1. 跨域处理（需要深入跨域了解
2. 关注点分离

缺点：

1. 无法取消，封装不够完整（可以使用Promise.race添加一个超时方法来reject fetch请求）
2. 默认不传cookie
3. 无法监控io进度

# Javascript高级程序设计

## 基本概念

### 数据类型

typeof：

- undefined ----未定义
- boolean——布尔值
- string——字符串
- number——数值
- object——对象或null
- function——函数

#### undefined

```javascript
var message;

// var age

alert(message); // undefined
alert(age); // 错误
```

```javascript
var message; 

// var age
alert(typeof message); // "undefined"
alert(typeof age); // "undefined"
```

#### null

```javascript
alert(null == undefined); // true
```

== 出于比较的目的会转换其操作数

#### Boolean

将一个值转换为其对应的Boolean值，可以调用转型函数Boolean()

| 数据类型  | 转换位true的值 | 转换为false的值 |
| --------- | -------------- | --------------- |
| Boolean   | true           | false           |
| String    | 任何非空字符串 | 空字符串        |
| Number    | 任何非零数字值 | 0 和 NaN        |
| Object    | 任何对象       | null            |
| Undefined | n/a            | undefined       |

#### Number

1. 浮点数float：有精度问题，0.1 + 0.2 不等于 0.3

2. 数值范围：Number.MIN_VALUE - Number.MAX_VALUE，可以使用isFinite（）函数判断一个数值是不是位于最小值和最大值之间

3. **NaN**：一个本来要返回数值的操作数未返回数值的情况。会出现NaN的情况下：

   - 任何数值 除以 0
   - 涉及NaN的操作（如NaN/10)

   isNaN（）：在接收到一个值之后，会尝试将这个值转换为数值，某些不是数值的值会直接转换为数值，而任何不能被转换为数值的值会使这个函数返回True

   ```javascript
   alert(isNaN(NaN)); // true
   alert(isNaN(10)); // false
   alert(isNaN("10")); // false
   alert(isNaN("blue")); // true blue不能被转换成数值
   alert(isNaN(true)); // false
   ```

4. **数制转换**：Number()、parseInt()、parseFloat()

   - Number()

     - Boolean: true——1， false——0
     - 数字——数字
     - **null——0**
     - **undefined——NaN**
     - 字符串：
       - 只包含数字：忽略前导0进行转换（"011"——11）
       - 包含浮点格式：忽略前导0的浮点数转换
       - 十六进制格式字符串——十进制：“0xf" ——15
       - 空字符串——0
       - 其他形式字符串——NaN
     - 对象：valueOf() ——> 如果结果为NaN，则再调用toString()

     ```javascript
     var num1 = Number("Hello world!"); // NaN
     var num2 = Number(""); // 0
     var num3 = Number("000011"); // 11
     var num4 = Number(true); // 1
     ```

   - parseInt()

     - 如果第一个字符不是数字字符或者负号，返回NaN（如空字符串）
     - 一直解析到 解析完所有后续字符 或者 遇到一个非数字字符（如“123blue” ——>123）
     - 可以识别整数格式（八进制、十六进制、十进制）
     - 可以提供第二个参数指定转换基数）parseInt("0xAF",  16)

   - parseFloat()

     - 始终忽略前导的0
     - 第一个小数点有效，第二个小数点无效，无效字符之后的字符串将被忽略
     - 只解析十进制值
     - 如果字符串包含的是一个可解析为整数的数，parseFloat()会返回整数

#### String

转换为字符串：

- toString()：null 和 undefined 没有这个方法

  数值的toString方法中可以传递一个参数，表示输出数值的基数

- String()：任何类型

  - 如果值有toString()方法，则调用该方法并返回相应的结果
  - null —— "null"
  - undefined —— "undefined"

#### Object

Object实例属性和方法

- constructor: 创建当前对象的函数
- hasOwnProperty(propertyName)：检查给定的属性在当前对象实例中是否存在
- isPrototypeOf(object)：传入的对象是否是另一个对象的原型
- propertyIsEnumerable(propertyName)：给定属性能否使用 for-in 语句来枚举
- toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应
- toString()：返回对象的字符串表示
- valueOf()：返回对象的字符串、数值或布尔值表示（通常与toString的返回值相同）

### 操作符

#### 一元加和减操作符

对非数值应用一元加、减操作符时，该操作符会像 Number() 转型函数一样对这个值执行转换（具体规则见上方）

#### 位操作符

64位数值被转换位32位，然后执行位操作，最后再将32位的结果转换回64位数值

将数字转换为二进制再进行操作

1. 按位非：~，操作数的负值减1

   ```javascript
   var num1 = 25;
   var num2 = -num1;
   alert(num2); // -26
   ```

2. 按位与AND：&

   11得1，其他得零

3. 按位或OR：|

   00得0，其他得1

4. 按位异XOR：^

   相同得0，不同得1

5. 左移：<<：将数值的所有位向左移动指定位数（0补充，且不影响符号位）

6. 有符号的右移：>>：向右移动数值，以0填充，但保留符号位

7. 无符号右移：>>>：向右移动数值，以符号位来填充空位

#### 相等操作符

==（会先转换操作数——强制转型，然后再比较相等性）

- Boolean——数值
- 字符串 == 数值：字符串——数值
- 对象==其他：对象.valueOf()，得到的基本类型值按照前面的规则进行比较
- null == undefined，且比较相等性之前，不能将这两个值转换位其他任何职
- NaN == 其他任意：false（NaN == NaN？ false)
- 对象 == 对象：比较两个操作数是不是**指向同一个对象**



### 函数

#### 函数参数

arguments**对象**，

- [i]：访问第 i 个参数

- .length：确定传递进来多少个参数

- 修改arguments[i]，会修改对应的命名参数，而修改命名参数，不会改变对应arguments中的值

  ```javascript
  function doAdd(num1, num2) {
      arguments[1] = 10;
      alert(arguments[0] + num2); // num2 值为10
  }
  ```

## 变量、作用域和内存问题

### 变量：基本类型 vs 引用类型

基本类型：undefined、Null、Boolean、Number、String（保存在栈内存中，因为它们在内存中占据拱顶大小的空间）

引用类型：对象（保存在堆内存中）

包含引用类型值的变量实际上包含的不是对象本身，而是一个指向该对象的指针

#### 动态属性

- 不能给基本类型的值添加属性（虽然不会报错）
- 引用类型：可以添加属性和方法，也可以改变和删除其属性和方法

#### 赋值变量值

- 基本类型：在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上（新旧变量是完全独立的）
- 引用类型：将存储在变量对象中的值复制一份放到为新变量分配的空间中，但是这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。赋值操作结束后，俩那个各变量实际上将引用同一个对象。

![1552229048302](C:\Users\张文玘\AppData\Roaming\Typora\typora-user-images\1552229048302.png)

#### 传递参数

函数参数都是**按值传递**，参数传递相当于**变量复制**

#### 检测类型

基本数据类型的检测：typeof

缺陷：如果变量的值是一个对象或者null，typeof会返回"object"

引用类型的对象：instanceof

```javascript
result = variable instanceof constructor
```

根据原型链识别引用类型

【注】如果使用instanceof操作符检测基本类型的值，则该操作符始终会返回false，因为基本类型不是对象

### 执行环境及作用域

每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环境就会被推入一个环境栈中，而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境

作用域链：保证对执行环境有权访问的所有变量和函数的有序访问

- 作用域链的前端，始终都是当前执行的代码所在环境的变量对象
- 作用域链中的下一个变量对象来自包含环境，
- 再下一个变量对象来自下一个包含环境
- 直到全局执行环境，全局执行环境的变量对象始终都是作用域链中的最后一个对象

执行环境分类：

- 全局
- 局部（函数）：函数的参数也被当作变量对待（如arguments对象）
- 块级作用域（ES6）：循环或条件判断代码块中的变量作用域，如let、const

#### 延长作用域链

可以再作用域链的前端临时增加一个变量对象

- try-catch语句的catch块：创建一个新的变量对象，其中包含被抛出的错误对象的声明（只在catch内部可以访问）
- with语句

### 垃圾收集

原理：找出那些不再继续使用的变量，然后释放其占用的内存

两个策略

1. 标记清除。当变量进入环境时，就将这个变量标记为"进入环境"；当变量离开环境时，标记为”离开环境“，永远不能清除 进入环境的变量所占用的内容

   垃圾收集器的处理流程

   - 运行时给存储在内存中的所有变量都假商标及
   - 去掉环境中的变量以及被环境中变量引用的变量的标记
   - 之后再为准备删除的变量加上标记

2. 引用计数：跟踪记录每个值被引用的次数

   - 当声明了一个变量并将一个**引用类型**值赋给该变量时，这个值的引用次数就是1

   - 如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数 - 1
   - 如果同一个值又被赋给另一个变量，则该值的引用次数 + 1
   - 当值的引用次数变为0时，说明没有办法再访问这个值了，就可以将其所占用的内存空间回收

   循环引用？

#### 性能问题

IE7：触发垃圾收集的变量分配、字面量 和 数组元素的临界值被调整为动态修正

#### 管理内存

解除引用：通过将值设置为 null 来释放引用

解除值的引用并不意味着自动回收该值所占用的内存，其真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收

函数内部的局部变量会在函数执行完毕之后自动解除引用

## 引用类型

### Object类型

创建Object实例的两种方式：

- new Constructor()，

  ```javascript
  var person = new Object();
  perosn.name = "Nicholas"
  person.age = 29;
  ```

- 对象字面量

  ```javascript
  var person = {
      name: 'Nicholas',
      "age": 29,
      5: true
  }
  ```

  - 最后一个属性值后面不能加逗号
  - 属性名会自动转换为字符串
  - 不会调用Object构造函数
  - 属性名中可以包含非字母和非数字

### Array类型

创建数组的两种方式：

- Array构造函数

  ```javascript
  var colors = new Array(20)
  var colors = new Array()
  var colors = new Array('a', 'b')
  
  var colors = Array(3)
  var colors = Array('hhh')
  ```

- 数组字面量

  ```javascript
  var colors = ['red', 'blue', 'green']
  ```

  - 不会调用Array构造函数

数组的length属性是**可读可写**的

```javascript
var colors = ["red", "blue", "green"];
colors[99] = "black"
alert(colors.length); // 100
```

#### 检测数组

Array.isArray()

value instanceof Array

#### 转换方法

Array.toString()相当于对array的每一项元素调用toString，然后用 逗号 连接

Array.toLocalString() 相当于对array的每一项元素调用toLocalString， 然后用 逗号 连接

Array.join('str')，每一项使用toString()，如果str不传，默认以逗号分隔，对于每个数组元素，null 和 undefined 会返回 空字符串

#### 栈方法（模仿栈）：push\pop

push() 和 pop()，只操作数组末尾的元素

push()：返回添加该元素后数组的长度

pop()：返回被移除的项

#### 队列方法（模仿队列，先进先出）：shift\unshift

shift()：移除数组中的第一项，并返回被移除的项

push()：向数组末尾添加元素

unshift()：在数组前端添加任意个项并返回新数组的长度

```javascript
var colors = new Array();
var count = colors.unshift("red", "green");
alert(count); // 2
```

#### 重排序方法：reverse/sort

- reverse()：直接反转数组项的顺序

- sort()：默认按照升序排列，默认情况下，调用每个数组项的toString() 方法，然后比较得到的字符串

  - 可以自定义比较函数：
    - a应该位于b之前——返回**负数**
    - a = b——返回0
    - a应该位于b之后——返回**正数**
    - compare()：只针对**数值类型**或者**valueOf（）方法返回数值类型的对象类型**

  ```javascript
  function compare(value1, value2) {
  	return value2 - value1
  }
  ```

#### 操作方法：concat/slice/splice

concat（）：不会改变原数组，返回的是数组副本

slice()：基于当前数组中的一或多个项创建一个新数组，1~2个参数（左闭右开区间）

- 返回项的起始位置（**required**）
- 返回项的结束位置（choice），默认到数组末尾
- 几个注意项：
  - 区间为左闭右开区间，包含起始不包含结束
  - slice方法不修改原数组，返回数组副本
  - slice(-2, -1) ，对于length = 5的数组，相当于slice(3, 4)

splice()：主要用于向数组的中部插入项

- 三个使用方式

  - 删除：splice(要删除的第一项的位置，要删除的项数)

  - 插入：splice(起始位置，要删除的项数（可以为0），要插入的任意数量的项)

  - 替换：splice(起始位置，要删除的项数，要插入的任意数量的项)

    ```javascript
    splice(2, 1, "red", "green")，删除位置2的项，然后再从位置2开始插入字符串“red”和“green”
    ```

  ```javascript
  var colors = ["red", "green", "blue"];
  var removed = colors.splice(0,1); // 删除第一项
  alert(colors); // green,blue
  alert(removed); // red，返回的数组中只包含一项
  removed = colors.splice(1, 0, "yellow", "orange"); // 从位置1 开始插入两项
  alert(colors); // green,yellow,orange,blue
  alert(removed); // 返回的是一个空数组
  removed = colors.splice(1, 1, "red", "purple"); // 插入两项，删除一项
  alert(colors); // green,red,purple,orange,blue
  alert(removed); // yellow，返回的数组中只包含一项
  
  ```

- 注意点：

  - splice()方法会改变原数组
  - 返回值为被删除的项（如果没有删除任何值，则返回一个空数组）

#### 位置方法：indexOf/lastIndexOf

接受两个参数：

- 要查找的项
- （可选）表示查找起点位置的索引
- indexOf 从数组开头开始，从前往后找
- lastIndexOf 从数组末尾开始，从后往前找
- 没找到的情况下返回-1
- 比较使用 ===

#### 迭代方法：every / filter / forEach / map / some

接受两个参数：要在每一项上运行的函数 和 （可选的）运行该函数的作用域对象（影响this的值）

- every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true， 则返回 true
- some()：对数组。。。，如果该函数对任一项返回true，则返回true
- forEach()：运行函数，没有返回值
- filter()：运行函数，返回该函数会返回true 的项组成的数组
- map()：运行函数，返回每次函数调用的结果组成的数组

以上方法都不修改原数组

#### 归并方法：reduce / reduceRight

迭代数组的所有项，然后构建一个最终返回的值，reduce 从前往后遍历，reduceRight 从后往前遍历

接受两个参数：

- 在每一项上调用的函数：(reduceResult, currentValue, currentIndex, array)， 返回值作为第一个参数传给下一项
- （可选的）作为归并基础的初始值

### Date 类型

const now = new Date(); // 获取当前日期和时间

Date.parse()：

- 接收一个表示日期的字符串参数
- 尝试根据这个字符串返回相应日期的**毫秒数**，若传入字符串不能表示日期，那么他会返回 NaN

Date.UTC()

- 参数：年份、基于0的月份、月中的那一天、小时数、分钟、秒、毫秒

  只有年月是必须的，其他天默认为1，其余默认为0

Date.now()：返回当前毫秒数

#### 继承的方法：toLocaleString()、toString()、valueOf()

toString()：返回带有时区信息的日期和时间

toLocaleString()：按照浏览器设置的地区相适应的格式返回日期和时间

valueOf()：返回日期的毫秒表示（可以用来比较日期值）

【注】对象比较的方式：先valueOf()，不能处理的话再用toString()处理

```javascript
var date1 = new Date(2007, 0, 1);
var date1 = new Date(2007, 1, 1);

alert(date1 < date2)

```

#### 日期格式化方法：toDateString()、toTimeString()、toLocaleDateString()、toLocaleTimeString()、toUTCString()

### RegExp类型

匹配模式：

- g：全局模式，模式被应用于所有字符串
- i：不区分大小写模式
- m：多行模式，在到达一行文本末尾时会继续查找下一行中是否存在与模式匹配的项

构建正则表达式的两种方式：

- 字面量模式

  ```javascript
  var pattern1 = /[bc]at/i; // 匹配第一个“bat”或者“cat”，不区分大小写
  
  ```

- 构造函数

  ```javascript
  var pattern2 = new RegExp("[bc]at", "i")
  
  ```

  字符串中的转义字符需要双重转义（字符 \ 在字符串中通常被转义为 \\\）

  | 字面量模式            | 等价的字符串                    |
  | --------------------- | ------------------------------- |
  | /\\[bc\\]at/          | "\\\\[bc\\\\]at"                |
  | /\\.at/               | "\\\\.at"                       |
  | /name\\/age/          | "name\\\\/age"                  |
  | /\\d.\\d{1, 2}/       | "\\\\d.\\\\d{1, 2}"             |
  | /\\w\\\\hello\\\\123/ | "\\\\w\\\\\\\\hello\\\\\\\\123" |



#### RegExp的实例方法：exec() \ test()

##### exec()：

专门为捕获组而设计，返回匹配的Array实例，但包含两个额外属性：

- index（匹配项在字符串中的位置）
- input（应用正则表达式的字符串）

exec方法中，即使在模式中设置了全局表示（g），它每次也只会返回一个匹配项，

- 若没有设置/g，在同一个字符串上多次调用exec() 将始终返回第一个匹配项的信息
- 若设置了/g，每次调用 exec() 都会在字符串中继续查找新匹配项

```javascript
var text = "cat, bat, sat, fat";
var pattern1 = /.at/;

var matches = pattern1.exec(text);
alert(matches.index); //0
alert(matches[0]); //cat
alert(pattern1.lastIndex); //0

matches = pattern1.exec(text);
alert(matches.index); //0
alert(matches[0]); //cat
alert(pattern1.lastIndex); //0

var pattern2 = /.at/g;
var matches = pattern2.exec(text);
alert(matches.index); //0
alert(matches[0]); //cat
alert(pattern2.lastIndex); //3
matches = pattern2.exec(text);
alert(matches.index); //5
alert(matches[0]); //bat
alert(pattern2.lastIndex); //8

```

##### test

接受一个字符串参数。在模式与该参数匹配的情况下返回true，否则返回false

```javascript
const text = "000-00-0000"
const pattern = /\d{3}-\d{2}-\d{4}/

console.log(pattern.test(text)) // true

```

##### 继承方法

返回正则表达式的字面量

```javascript
var pattern = new RegExp("\\[bc\\]at", "gi");
alert(pattern.toString()); // /\[bc\]at/gi
alert(pattern.toLocaleString()); // /\[bc\]at/gi
```

### 基本包装类型

为便于操作基本类型值，ECMAScript提供了3个特殊引用类型：Boolean、Number、String

每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的**对象**，从而让我们能够调用一些方法来操作这些数据

访问字符串的过程：

1. 创建String类型的一个实例
2. 在实例上调用指定的方法
3. 销毁这个实例

与引用类型的区别：对象的生存期

- 引用类型（new操作符创建的实例），在执行流离开当前作用域之前一直都保存在内存中

- 基本包装类型（自动创建的对象），只存在于一行代码的执行瞬间，然后立即被销毁

  ```javascript
  let s1 = "some text";
  s1.color = "red"; // 为s1创建一个基本包装类型（对象），并添加color属性，但是这个对象只存在这一行代码的执行瞬间，执行完毕之后对象被销毁
  ```

【注】

1. 对基本包装类型调用 typeof 会返回 “object”

2. 所有基本包装类型的对象都会被转换为布尔值 true

3. Object构造函数，根据传入值的类型返回相应基本包装类型的实例

   ```javascript
   var obj = new Object("some test");
   alert(obj instanceof String); // true
   ```

   把字符串传给Object构造函数，就会创建String实例

   传入数值参数得到Number实例，传入布尔值得到Boolean实例

4. 使用new调用基本包装类型的构造函数，与直接调用同名的转型函数不同

   ```javascript
   var value = "25";
   var number = Number(value); // 转型函数
   alert(typeof number); // "number"
   
   var obj = new Number(value); // 构造函数
   alert(typeof obj); // "object"
   ```

#### Boolean类型

```javascript
var falseObject = new Boolean(false);
var result = falseObject && true; // 布尔表达式中所有对象都会被转换为true
alert(result); // true

var falseValue = false
result = falseValue && true
alert(result); // false

typeof flaseObject; // "object"
typeof falseValue; // "number"
falseObject instanceof Boolean; // true
falseValue instanceof Boolean; // false
```

#### Number类型

- toFixed(小数位数)：小数点精简

- toExponential(小数位数)：指数表示

- toPrecision(数值所有数字的位数)：toFixed和toExponential综合，具体看这个数字转换为哪个格式比较合适

  ```javascript
  var num = 99;
  alert(num.toPrecision(1)); // "1e+2" 向上舍入为100后再算
  alert(num.toPrecision(2)); // "99"
  alert(num.toPrecision(3)); // "99.0"
  ```

#### String类型

1. 字符方法

   - charAt()：返回给定位置的字符
   - charCodeAt()：返回给定位置字符的字符编码
   - 通过方括号下标访问：string[i]

2. 字符串操作方法

   - concat()：不改变原字符串，返回拼接得到的新字符串（可以接受任意多个字符串进行拼接）
   - slice(start, [end + 1])：所有负值都加上字符串长度
   - substring(start, [end + 1])：第一个负值加上字符串长度，第二个负值转换为0
   - substr(start, [substr length])：把所有负值参数转换位0
   - 以上三个方法都不改变原字符串，返回一个新字符串

3. 字符串位置方法

   - indexOf
   - lastIndexOf

4. trim

5. 字符串大小写转换：

   - toLowerCase()
   - toLocaleLowerCase()
   - toUpperCase()
   - toLocaleUpperCase()

6. 字符串的模式匹配方法

   - match( 正则表达式 / RegExp对象 )：作用同RegExp的 exec

     ```javascript
     var text = "cat, bat, sat, fat";
     var pattern = /.at/
     
     var matches = text.match(pattern); // 同pattern.exec(text)
     alert(matches.index); // 0
     alert(matches[0]); // "cat"
     alert(pattern.lastIndex); // 0
     ```

   - search( 正则表达式 / RegExp对象 )：返回字符串中第一个匹配项的索引，没有的话返回-1

     ```javascript
     var text = "cat, bat, sat, fat";
     var pos = text.search(/at/);
     alert(pos); // 1
     ```

   - replace( 字符串 / RegExp对象，字符串 / 函数 )：

     - 只有提供正则表达式/g，才能替换所有子字符串

     ```javascript
     var text = "cat, bat, sat, fat";
     var result = text.replace("at", "ond");
     alert(result); // "cond, bat, sat, fat"
     
     result = text.replace(/at/g, "ond");
     alert(result); // "cond, bond, sond, fond"
     ```

   - split

不建议直接实例化这几个基本包装类型使用，在使用typeof 和 instanceof 操作符测试基本类型数值与引用类型数值时，得到的结果完全不同

### Global对象

所有在全局作用域中定义的属性和函数，都是Global对象的属性（如isNaN()、isFinite()、parseInt()、parseFloat()）

包括的几个全局方法：

​	escape()、eval()、isFinite()、isNaN()、parseFloat()、parseInt()、unescape()

#### URI编码方法

对URI进行编码，有效的URI中不能包含某些字符，例如空格，URI编码方法对URI进行编码，用特殊的UTF-8编码替换所有无效的字符

- encodeURI()：主要用于整个uri

- encodeURIComponent()：用于对URI中的某一段进行编码

区别：encodeURI 不会对本身属于URI的特殊字符进行编码，如 冒号、正斜杠、问号、井字号；而 encodeURIComponent 就会对它发现的任何非标准字符进行编码

```javascript
var uri = "http://www.wrox.com/illegal value.htm#start";

console.log(encodeURI(uri)); 
// http://www.wrox.com/illegal%20value.htm#start

console.log(encodeURIComponent(uri));
// http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start
```

可以对整个URI使用encodeURI，而只能对附加在现有URI后面的字符串使用encodeURIComponent()

- decodeURI()：只能对使用encodeURI 替换的字符进行解码
- decodeURIComponent()：只能……encodeURIComponent()解码

#### eval() 方法

当解析器发现代码中调用 eval() 方法时，它会将传入的参数当作实际的ECMAScript语句来解析，然后把执行结果插入到原位置。

- 通过 eval() 执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与其执行环境相同的作用域链
- 通过 eval() 执行的代码可以引用在包含环境中定义的变量
- eval中创建的任何变量或函数都不会被提升
- 严格模式下，外部访问不到 eval() 中创建的任何变量或函数

#### Global对象的属性

- 特殊值：undefined、NaN、Infinity
- **原生引用类型**的构造函数，像 Object 和 Function

#### window 对象

Web浏览器中的全局Global对象

另一种取得Global对象的方法：

```javascript
var global = function(){
    return this;
}()
```

## 面向对象的程序设计

