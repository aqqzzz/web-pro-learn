// 求最长公共子序列
function LCS(arr1, arr2) {
  let dp = new Array()
  dp[0] = new Array(arr1.length).fill(1)
  for (let i = 1; i < arr1.length; i++) {
    dp[i] = new Array(arr1.length).fill(1)
    
    for (let j = 1; j < arr2.length; j++) {
      dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
      if (arr2[j] === arr1[i]) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1)
      }
    }
  }
  for (let i = 0; i < dp.length; i++) {
    console.log(dp[i].toString())
  }
}

LCS([1, 3, 2, 4, 5], [1, 2, 3, 4, 5])