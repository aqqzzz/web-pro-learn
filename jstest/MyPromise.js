Promise.myRace = function(promiseList) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseList.length; i++) {
      Promise.resolve(promiseList[i]).then((value) => {
        resolve(value)
        return
      }, (err) => {
        reject(err)
        return
      })
    }
  })
}

Promise.myAll = function(promiseList) {
  
  return new Promise((res, rej) => {
    let resolveCount = 0
    let resolveRes = []
    for (let i = 0; i < promiseList.length; i++) {
      Promise.resolve(promiseList[i]).then((value) => {
        resolveRes.push(value)
        resolveCount++
        if (resolveCount === promiseList.length) {
          res(resolveRes)
          return
        }
      }, (err) => {
        rej(err)
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

Promise.myRace([p1, p2]).then((v) => {
  console.log(v)
})

// Promise.myAll([p1, p2]).then((res) => {
//   console.log(res)
// })

