// class Test {
//   // _aValue = 3;
//   constructor() {
//     this.aValue = 1
//     this.b = 2
//     // this.funcTest = this.funcTest.bind(this)
//     // this.funcTest()
//   }
//   get a () {
//     return this.aValue
//   }

//   set a (value) {
//     this.aValue = value
//   }

//   funcTest() {
//     this.a = 2
//   }
  
// }



// const test = new Test()
// console.log(Object.keys(test))
// console.log(JSON.parse(JSON.stringify(Object.getOwnPropertyDescriptors(Test.prototype))))
// console.log(test.a, test.aValue, Object.keys(test))
// test.funcTest()
// console.log(test.a)
// console.log(test.__proto__)
// console.log(Object.keys(test))
// console.log(methodName())

// function myFunc() {
//   let a = 1
// }
// const newFunc = new myFunc()
// const normalFunc = myFunc()

class Parent {
  constructor (){
    this.a = 1
  }
  print() {
    console.log(this.a)
  }
  myPrivate(func) {
    return bar.call(this, func)
  }
}

function bar(func) {
  this.private = func
}

class Child extends Parent {
  constructor () {
    super(...arguments)
    this.a = 2
  }

}


// b.test()
const a = new Parent()
function privTest() {
  console.log('private')
}
a.myPrivate(privTest)
a.private()
a.print()
const b = new Child()
b.print()
b.myPrivate(() => {console.log(this)})
b.private()
