/**
 * •连续输入字符串，请按长度为8拆分每个字符串后输出到新的字符串数组； 
•长度不是8整数倍的字符串请在后面补数字0，空字符串不处理。 
 */
const template = '00000000'
function strSplit(strs) {
  let res = []
  strs.forEach((str) => {
      while(str.length > 8) {
        console.log(str.slice(0, 8))
        res.push(str.slice(0, 8))
        str = str.slice(8)
      }
      if (str.length !== 0) {
        let tmp = template
        tmp = str + tmp.slice(str.length)
        res.push(tmp)
        console.log(tmp)
      }
      
    
  })
}

strSplit(['urivthvtlqqerctlxmjvkgvfclaaduwmaadedpadanl', 'batkqdhjnrwtsmzidswdnenqpsblsszldyttytrgenaizwehntqiaaufble'])