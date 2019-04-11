// 字符串展开
function strOpen(str) {
  let stack = []
  let length = str.length
  for (let i = 0; i < length; i++) {
    let char = str[i]
    let openIndex = i
    if (char === '(' || char === '[' || char === '{') {
      stack.push(i)
    } else if (char === ')' || char === ']' || char === '}') {
      openIndex = stack.pop()
      let times = ''
      let j = openIndex
      while(parseInt(str[j - 1]) >=0 && parseInt(str[j-1]) <= 9) {
        times += str[j-1]
        j--
      }
      times = parseInt(times)
      const repeatStr = str.slice(openIndex + 1, i)
      
      const repeatStrs = new Array(times).fill(repeatStr).join('')
      str = str.slice(0, j) + repeatStrs + (i !== length - 1 ? str.slice(i + 1) : '')
      i = i + (str.length - length)
      length = str.length
    }
  }
  let res = ''
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i]
  }
  
  return res
}

console.log(strOpen('abc3[A2(BC)'))