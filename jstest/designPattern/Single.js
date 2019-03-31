const getSingleton = function(fn) {
  let instance = null
  return function() {
    return instance || (instance = fn.call(this, arguments))
  }
}

function test1() {
  console.log('test1')
  return {a: 1}
}

const a = getSingleton(test1)
const b = a()
const c = a()
console.log(b === c)
