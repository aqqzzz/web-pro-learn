Array.prototype.myReduce = function(callback, initial) {
  let value = initial
  for (let i = 0; i < this.length; i++) {
    value = callback(value, this[i], i, this)
  }
  return value
}

const array = [1, 2, 3]
console.log(array.myReduce((prev, cur, idx) => { prev[idx] = cur; return prev}, {}))

Array.prototype.myMap = function(callback) {
  return this.reduce((prev, cur, index) => {
    prev.push(callback(cur, index))
    return prev
  }, [])
}

console.log(array.myMap((value) => value + 1))