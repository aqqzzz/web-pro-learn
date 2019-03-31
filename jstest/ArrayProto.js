Array.prototype = new String()

const a = [1, 2, 3]
console.log(a instanceof String)
console.log(a.__proto__)
