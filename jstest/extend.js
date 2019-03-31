function extend(child, parent) {
  var F = function(){}
  F.prototype = parent.prototype
  child.prototype = new F()
  child.prototype.constructor = child
}

var Parent = function(name) {
  this.name = name
  this.method = function(){}
}

Parent.prototype.createBicycle = function() {
  throw new Error('父类不能生产自行车')
}

Parent.prototype.sellBicycle = function() {
  const bicycle = this.createBicycle()
  bicycle.A.call(this)
  bicycle.B.call(this)
  return bicycle
}

var Child = function(name) {
  this.name = name
  Parent.call(this, name)
}

extend(Child, Parent) // 定义父类和子类之后要先继承，再用prototype去扩展子类的方法

Child.prototype.createBicycle = function() {
  return {
    A: function(){
      console.log(this.name + ' A')
    },
    B: function() {
      console.log(this.name + 'B')
    }
  }
}



const c = new Child('龙恩')
console.log(c)
c.sellBicycle()



// // 复杂工厂模式
// class Parent {
//   constructor (name) {
//     this.name = name
//   }

//   method() {
//     return this.name
//   }

//   createBicycle(model) {
//     throw new Error('cannot create bicycle from abstract parent')
//   }

//   sellBicycle(model) {
//     const bicycle = this.createBicycle(model)
//     bicycle.A()
//     bicycle.B()
//     return bicycle
//   }
// }

// class Child extends Parent {
//   constructor(name) {
//     super(name)
//   }

//   createBicycle() {
//     function A() {
//       console.log('执行A')
//     }
//     function B() {
//       console.log('执行B')
//     }
//     return {
//       A: A,
//       B: B,
//     }
//   }
// }

// const childBike = new Child('龙恩')
// console.log(childBike)
// childBike.sellBicycle('mode')