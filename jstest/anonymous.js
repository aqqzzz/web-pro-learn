"use strict";

// var b = 10

// (function b(){
//   // b = 20
//   console.log('function', b)
// })()
// console.log(b)

// var b = 10;
// console.log('hello');
// console.log(b);
// (function b (){ 
//   console.log(b);
  // b = 20;
  // console.log(b) 
// })()
// console.log(b);

(function b(){

})

// 会报错
/**
 * 1. 立即执行函数为函数表达式类型，声明式会有作用域提升（undefined），为它赋值的函数不会提升，运行到的时候才会赋值
 * 2. 函数表达式 的函数名只在该函数内部有效
 * 3. 函数表达式的函数名在函数内部是常量绑定，不能修改，对常量的绑定操作
 *    在strict模式下会报错 Assignment to constant variable
 *    非 strict 模式下会静默失效
 * 4. var b = 10 之后定义一个立即执行函数，报错 10 is not a function ，因为10后面没分号，在它后面定义 (function(){})() ，被当成 10(...)
 */