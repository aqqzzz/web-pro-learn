// 宏命令，定义一个统一的execute接口来执行
// 定义命令
var command1 = {
  execute: function() {
    console.log(1)
  }
}

var command2 = {
  execute: function() {
    console.log(2)
  }
}


var command = function() {
  return {
    commandList: [],
    add: function(command) {
      this.commandList.push(command)
    },
    execute: function() {
      this.commandList.forEach(function(cmd) {
        cmd.execute()
      })
    }
  }
}

var c = new command()
c.add(command1)
c.add(command2)
c.execute()