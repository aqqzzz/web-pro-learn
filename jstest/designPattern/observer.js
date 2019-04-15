var event = {
  observers: {},
  listen: function(key, func) {
    if (!this.observers[key]) {
      this.observers[key] = []
    }
    this.observers[key].push(func)
  },
  trigger: function(key) {

    if (this.observers[key] === null) {
      return
    }
    if (this.observers[key].length == 0) {
      return
    }
    var args = Array.prototype.slice.call(arguments, 1)
    var list = this.observers[key]
    for (let i = 0; i < list.length; i++) {
      list[i].apply(this, args)
    }
  }
}

var initEvent = function(obj) {
  for (let i in event) {
    obj[i] = event[i]
  }
}

// 我们再来测试下，我们还是给shoeObj这个对象添加发布-订阅功能；
var shoeObj = {};
initEvent(shoeObj);

// 小红订阅如下消息
shoeObj.listen('red',function(size){
    console.log("尺码是："+size);  
});

// 小花订阅如下消息
shoeObj.listen('block',function(size){
    console.log("再次打印尺码是："+size); 
});
shoeObj.trigger("red",40);
shoeObj.trigger("block",42);