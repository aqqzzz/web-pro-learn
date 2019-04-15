Promise.myRace = function(promiseList) {
  let count = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseList.length; i++) {
      Promise.resolve(promiseList[i]).then((value) => {
        if (count === 0) {
          resolve(value)
          count = 1
        }
        // return
      }, (err) => {
        if (count === 0) {
          reject(err)
          count = 1
        }
        // return
      })
    }
  })
}

Promise.myAll = function(promiseList) { 
  
  return new Promise((res, rej) => {
    let resolveCount = 0
    let resolveRes = []
    for (let i = 0; i < promiseList.length; i++) {
      // promiselist中每个都必须是一个Promise对象，如果不是，那么就把它包装成一个Promise对象
      Promise.resolve(promiseList[i]).then((value) => {
        resolveRes.push(value)
        resolveCount++
        if (resolveCount === promiseList.length) {
          res(resolveRes) 
          return
        }
      }, (err) => {
        rej(err) // 如果某一个请求被reject，那么p则直接被reject
        return
      })
    }
  })
  
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p1')
    resolve(1)
  }, 500)
})

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('p2')
    resolve(2)
  }, 2000)
})

Promise.race([p1, p2]).then((v) => {
  console.log(v)
})

// Promise.myAll([p1, p2]).then((res) => {
//   console.log(res)
// })

