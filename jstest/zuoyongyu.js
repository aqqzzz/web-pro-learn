(function() {
  let a = b = 3; 
  // let i = 0, j = 0; j相当于使用let声明
  // 以上代码相当于：
  /**
   * b = 3
   * let a = b
   */
})()

console.log(b, j)

const pro = new Promise((resolve) => {
  resolve(1)
})

pro.then((v) => {
  console.log(v)
  return 2
})

pro.then((v) => {
  console.log(v)
})
// 问题：对一个promise对象多次then是什么操作