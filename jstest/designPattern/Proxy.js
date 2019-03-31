
// const myImage = (function() {
//   var imgNode = document.createElement('img')
//   document.body.appendChild(imgNode)
//   return function(src){
//     this.src = src
//   }
// })()

// const proxy = (function() {
//   let image = new Image()
//   image.onload = function() {
//     myImage(this.src)
//   }
//   return function(src) {
//     myImage('预加载图片')
//     this.src = src
//   }
// })()

// proxy('想要加载的图片')

// 计算乘法
var mult = function(){
  var a = 1;
  for(var i = 0,ilen = arguments.length; i < ilen; i+=1) {
      a = a*arguments[i];
  }
  return a;
};
// 计算加法
var plus = function(){
  var a = 0;
  for(var i = 0,ilen = arguments.length; i < ilen; i+=1) {
      a += arguments[i];
  }
  return a;
}

var proxy = function(fn) {
  var cache = {}
  return function() {
    const args = Array.prototype.join.call(arguments, '')
    if (cache[args]) {
      return cache[args]
    } else {
      const res = fn.apply(this, arguments)
      cache[args] = res
      return res
    }
  }
}

var proxyMult = proxy(mult)
console.log(proxyMult(1, 2, 3, 4))
console.log(proxyMult(1, 2, 3, 4))