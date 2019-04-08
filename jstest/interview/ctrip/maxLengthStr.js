// 找到最长无重复子串的长度
function maxLengthStr(str) {
  let dp = new Array(str.length + 1).fill('')
  dp[0] = str[0]
  for (let i = 1; i < str.length; i++) {
    if (dp[i-1].indexOf(str[i]) < 0) {
      dp[i] = dp[i-1] + str[i]
    } else {
      dp[i] = dp[i-1].substring(dp[i-1].indexOf(str[i]) + 1) + str[i]
    }
  }
  dp.sort(function(a, b) {
    if (a.length < b.length) {
      return -1
    } else if (a.length === b.length) {
      return 0
    } else {
      return 1
    }
  })
  return dp[str.length - 1].length
}
console.log(maxLengthStr('abbcdeabcabc'))

// console.log('123'.substring)