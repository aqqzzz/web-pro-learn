// 串行请求urls
// function sleep() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('fetch')
//       resolve()
//     }, 1000)
//   })
// }
// function requestByPromise(urls) {
//   return urls.reduce(function (promise, task, i) {
//     promise = promise.then(() => sleep())
//     return promise
//   }, Promise.resolve());
//   // let promise = Promise.resolve()
//   // for (let i = 0; i < urls.length; i++) {
//   //   promise = promise.then(() => sleep(1))
//   // }
// }

// requestByPromise(new Array(3))
let makePromise = (value) => {
  console.log("sync", value)
  return new Promise(resolve => {
      setTimeout(() => {
          console.log("async", value)
          resolve(value)
      }, Math.random() * 1000)
  })
}
let print = (value) => {
  console.log("print", value)
  return value
}
let values = [1, 2, 3, 4]
let promises = values.map(value => makePromise(value)) // 这里就已经开始并行加载
let parallelPromises = promises.reduce(
  (current, next) => current.then(() => next),
  Promise.resolve()
)
parallelPromises
  .then(() => console.log("done"))
  .catch(() => console.log("failed"))