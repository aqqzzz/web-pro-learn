// 拆分字符串
const templateStr = '00000000'
function strSplit(strs) {
  let res = []
  for (let i = 0; i < strs.length; i++) {
    let str = strs[i]
    while(str.length >= 8) {
      res.push(str.slice(0, 8))
      str = str.slice(8)
    }
    if (str.length < 8) {
      str = str + templateStr.slice(str.length)
      res.push(str)
    }
  }
  res.sort()
  return res
}

const res = strSplit('abc 123456789'.split(' '))
console.log(res.join(' '))