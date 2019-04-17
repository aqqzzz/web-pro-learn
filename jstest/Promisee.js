const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function Promisee(fn) {
  if (typeof fn !== 'function') {
    throw Error('fn must be a function')
  }
  let value = null
  let state = PENDING
  let handler = []
  function resolve(val) {
    if (!val) {
      return
    }
    let thenable = typeof val.then == 'function' ? val.then : null
    if (thenable) {
      thenable.bind(val)(resolve, reject)
      return;
    }
    state = FULFILLED
    value = val
    handler.forEach(next)
    handler = []
  }
  function reject(err) {
    state = REJECTED
    value = err
    handler.forEach(next)
    handler = []
  }

  function next({onResolve, onReject}) {
    switch(state) {
      case FULFILLED:
        onResolve && onResolve(value)
        break;
      case REJECTED:
        onReject && onReject(value)
        break;
      case PENDING:
        handler.push({onResolve, onReject})
        break;
    }
  }

  this.then = function(onResolve, onReject) {
    return new Promisee((resolve, reject) => {
      next({
        onResolve: () => {
          resolve(onResolve(value))
        }, 
        onReject: () => {
          reject(onReject(value))
        }
      })
    })
  }
  fn(resolve, reject)
}

function sleep(sec) {
  return new Promisee((resolve, reject) => {
    setTimeout(() => resolve(sec), sec * 1000)
  })
}

let p = new Promisee((resolve, reject) => {
  setTimeout(() => resolve('hello'), 0)
  // resolve('hello')
})
p.then((val) => {
  console.log(val)
  return 'world'
}).then((val) => {
  console.log(val)
  return sleep(1) // 返回一个Promise 对象时，应该以这个Promise对象的resolve、reject执行结果为下一个then的对应输入值
}).then((val) => {
  console.log(val)
  return 'over'
})

p.then((val) => {
  console.log(val)
})