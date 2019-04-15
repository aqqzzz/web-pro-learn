// https://zhuanlan.zhihu.com/p/38313717
// 防抖，delay时间内如果用户再次触发返回的函数，则重新开始计时
function debounce(fn, delay) {
  var timer = null
  return function() {
    clearTimeout(timer)
    var context = this
    var args = arguments
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

// 节流
function throttle(fn, delay) {
  var start = new Date().getTime()
  var timer = null
  return function() {
    var cur = new Date().getTime()
    var context = this
    var args = arguments
    clearTimeout(timer)
    if (cur - start >= delay) {
      fn.apply(context, args)
      start = cur
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args)
        start = cur
      }, delay)
    }
  }
}