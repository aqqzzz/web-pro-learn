Function.prototype.myCall = function(thisObj) {
  var thisObj = thisObj || window
  thisObj.fn = this
  var args = Array.from(arguments)
  var res = thisObj.fn(...args.slice(1))
  delete thisObj.fn
  return res
}

/**
 * 第一步：将函数的this指向传入的对象
 * 第二步：执行函数
 */

// 测试一下
var foo = {
  value: 1
};

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}

bar.myCall(foo, 'kevin', 18); 