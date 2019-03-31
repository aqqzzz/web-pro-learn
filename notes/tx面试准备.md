## Promise

### Promise的特点是什么

1. 三个状态：pending \ resolved \ rejected
2. 一旦从等待状态变为其他状态就永远不能更改状态了
3. 链式调用

### 什么是Promise链

每次调用 then 之后返回的都是一个新的Promise

如果在then中使用了 return，那么每次 return 的值都会被 Promise.resolve() 包装

### Promise 的构造函数执行 和 then 函数执行有什么区别

构造Promise  时， 构造函数是立即执行的

## generator

函数声明用 *

yield 和 yield*

yield* 对于有obj[Symbol.iterator] 属性的数据结构，都可以进行遍历，并对其调用.next()来获取该数据结构的下一个元素

天生具有该属性的数据结构有：

- 数组、
- Map、
- Set、
- String、
- 函数的arguments对象

也可以自己实现这个属性

### Thunk函数

用于替换多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数

Thunk函数转换器

```javascript
var Thunk = function(fn) {
    return function() {
		const args = Array.prototype.slice.call(arguments);
        return function(callback) {
            args.push(callback);
            return fn.apply(this, args)
        }
        
    }
}

// es 6
const Thunk = function(fn) {
	return function (...args) {
		return function(callback) {
            return fn.call(this, ...args, callback)
		}
    }
}
```

使用转换器的例子

```javascript
var readFileThunk = Thunk(fs.readFile)
readFileThunk(fileA)(callback);

function f(a, cb) {
    cb(a);
} 
const ft = Thunk(f)
ft(1)(console.log)
```

### Thunk 函数的自动流程管理

```javascript
function run(fn) {
	const gen = fn()
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) {
            return
        }
        result.value(next)
    }
    next();
}

function* g() {
    var f1 = yield readFileThunk('fileA')
    var f2 = yield readFileThunk('fileB');
    // ...
    var fn = yield readFileThunk('fileN')
};
run(g)
```

- run函数就是一个 Generator  函数的自动执行器。内部的next函数就是Thunk 函数的回调函数。next 先将指针移到 generator 函数的下一步（gen.next 方法），然后判断 generator 函数是否结束，如果结束的话直接退出，否则将 next 函数再传入 Thunk 函数（result.value）
- generator函数中的每个yield后面的异步操作都必须是Thunk，才能执行自动流程
- thunk函数的官方库：thunkify
- 自动执行的关键：必须有一种机制，自动控制Generator 函数的流程，接收和交还程序的执行权（回调函数 / Promise）。

### 基于Promise 的自动执行函数

```javascript
function run(gen) {
    const g = gen()
    function next(err, data) {
        var result = g.next(data)
        if (result.done) {
            return
        }
        result.value.then((data) => {
            next(data)
		})
	}
    next()
}
```



## async 和 await

如果函数加上 async，那么该函数就会返回一个 Promise（就是讲函数返回值 用 Promise.resolve() 包装了一下，和 then 中处理返回值一样）

```javascript
async function test() {
    return "1"
}
console.log(test()) // Promise{ <resolved>: "1" }
```

async 函数 返回一个 Promise 对象，可以使用 then方法添加回调函数。

当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

### async 和 await的特点，优缺点是什么

### await原理是什么

generator + Promise 的语法糖，且内部实现了自动执行 generator

async函数对Generator函数的改进：

1. 内置执行器，调用函数时可以自动执行，输出最终结果，而不像generator函数还需要多地调用 next

2. 语义更清楚

3. 适用性更好：

   对于 generator模块，如果想要实现自动执行函数， yield命令后面只能跟 Thunk 函数 或者 Promise 对象，

   而async函数的await 命令后面，可以是 Promise 对象和原始类型的值（会自动转换为立即resolved 的Promise 对象）

4. 返回值是Promise

   async函数的返回值是Promise对象，可以直接用then指定下一步操作

   Generator的返回值为Iterator对象