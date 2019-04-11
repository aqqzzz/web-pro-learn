// 十六进制和十进制的转换
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
function hexToTen(hexStr) {
  hexStr = hexStr.slice(2)
  let res = 0
  for (let i = 0; i < hexStr.length; i++) {
    let cur = hex.indexOf(hexStr[i].toUpperCase())
    res += cur * Math.pow(16, hexStr.length - i - 1)
  }
  return res
}

console.log(hexToTen('0x12'))