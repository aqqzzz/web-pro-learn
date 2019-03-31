// 命令模式
/**
 * 定义setCommand，在其中对特定对象调用特定方法
 * 定义command命令，返回一个执行对应功能的函数
 * 创建具体执行功能的对象及其函数
 * setCommand(对象，想要添加的命令)
 */
var b1 = document.getElementById('btn1')
var b2 = document.getElementById('btn2')
var b3 = document.getElementById('btn3')

var setCommand = function(button, fn) {
  button.onclick = function() {
    fn()
  }
}

var MenuBar =  {
  refresh: function(){
    alert('刷新菜单页面')
  }
}

var SubMenu = {
  add: function() {
    alert('添加菜单')
  }
}

var refreshMenuBarCommand = function(receiver) {
  return function() {
    receiver.refresh()
  }
}

var addSubMenuCommand = function(receiver) {
  receiver.add()
}

var refreshCommand = refreshMenuBarCommand(MenuBar)
var addCommand = addSubMenuCommand(SubMenu)

setCommand(b1, refreshCommand)
