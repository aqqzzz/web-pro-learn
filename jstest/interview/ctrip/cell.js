// 单元格公式依赖问题
function cell(obj, res) {
  if (Object.keys(obj).length === 0) {
    return res
  }
  let newObj = {...obj}
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]].length === 0) {
      const curNode = keys[i]
      res.push(curNode)
      delete newObj[curNode]
      keys = Object.keys(newObj)
      for (let j = 0; j < keys.length; j++) {
        let curIndex = newObj[keys[j]].indexOf(curNode)
        if (curIndex >= 0) {
          newObj[keys[j]].splice(curIndex, 1)
        }
      }
      break
    }
  }
  if (Object.keys(newObj) === Object.keys(obj)) {
    return res
  } else {
    return cell(newObj, res)
  }
}

input = {"A": ["B", "C"], "B": ["D", "C", "F"], "C": ["E"], "D": [], "E": ["D"], "F": ["E", "C"]}
const res = cell(JSON.parse(JSON.stringify(input)), [])
console.log(JSON.stringify(res))
// console.log(JSON.stringify(cell(JSON.parse(JSON.stringify(input)), [])))