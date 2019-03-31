var o1 = {}
var o2 = Object.create(null)
var o3 = Object.create({})
var o4 = {}
o4.__proto__ = null
console.log(o1.__proto__, typeof o1.toString)
console.log(o2.__proto__, typeof o2.toString)
console.log(o3.__proto__, typeof o3.toString)
console.log(o4.__proto__, typeof o4.toString)
