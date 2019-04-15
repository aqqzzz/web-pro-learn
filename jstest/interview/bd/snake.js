// 蛇形遍历
/**
 *                           1
               2                      3
        4           5           6
                  7           8

输出顺序：1 3 2 4 5 6 8 7
进入队列的顺序：1 2 3 6 5 4 7 8
node = {
  value: 1,
  left: node1,
  right: null
}

function snake(root) {}
 */
function snake(rootNode) {
  var arr = [{node: rootNode, level: 0}]
  var tmp = []
  while (arr.length !== 0) { // arr存储每一层的节点
    currentNode = arr.shift()
    tmp = [] // 构造一个tmp数组，用来存储当前层的孩子节点遍历顺序
    while(currentNode) {
      var level = currentNode.level + 1
      if (level % 2 === 0) { // 当前层按照蛇形遍历并将孩子节点push到tmp数组中
          if (currentNode.left) {
              tmp.push({node: currentNode.left, level: level})
          }
          if (currentNode.right) {
              tmp.push({node: currentNode.right, level})
          }
      } else {
          if (currentNode.right) {
              tmp.push({node: currentNode.right, level})
          }
          if (currentNode.left) {
              tmp.push({node: currentNode.left, level})
          }
      }
      console.log(currentNode.node.value) // 输出当前节点值
      currentNode = arr.shift() 
    }
    arr = tmp.reverse()
  }
  
  
}