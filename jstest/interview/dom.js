/**
 * 递归遍历 DOM 节点，输出 JSON 的结构
function DOM2JSON(node) {
  // TODO
}

// 输出
{
  tag: 'xxx',
  children: [
    { tag: 'xxx', children: []},
    { tag: 'eee': children: [
      {tag:'span', children: [] }
    ]}
  ]
}
 */

function DOM2JSON(node) {
  let childs = node.childNodes // node.children 不能直接map，需要使用Array转换
  
  const childRes = childs.map((child) => {
      return DOM2JSON(child)
  })
  
  return {
      tag: node.nodeName,
      children: childRes
  }
}