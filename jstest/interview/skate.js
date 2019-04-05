// 滑雪问题
/**
 * 二维数组，可以从上下左右四个方向走，但是只能走到值更小的方向
 */

function skate(arr, r, c) {
  const skateArr = new Array(r + 2)
  for (let i = 0; i < r+2; i++) {
    skateArr[i] = new Array(c + 2).fill(0)
    if (i === 0 || i === r+1) {
      continue
    }
    for (let j = 1; j < c + 1; j++) {
      skateArr[i][j] = arr[i-1][j-1]
    }
  }
  const dp = new Array(r + 2)
  for (let i = 1; i <= r; i++) {
    dp[i] = [0].concat(new Array(c).fill(1)).concat(0)
  }
  dp[0] = new Array(c + 2).fill(0)
  dp[r+1] = new Array(c + 2).fill(0)
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j < i; j++) {
      if (skateArr[i][j] > skateArr[i-1][j]) {
        dp[i][j] = Math.max(dp[i][j], dp[i-1][j] + 1)
      } 
      if (skateArr[i][j] > skateArr[i][j-1]) {
        dp[i][j] = Math.max(dp[i][j], dp[i][j-1] + 1)
      } 
      if (skateArr[i][j] > skateArr[i][j+1]) {
        dp[i][j] = Math.max(dp[i][j], dp[i][j+1] + 1)
      } 
      if (skateArr[i][j] > skateArr[i+1][j]) {
        dp[i][j] = Math.max(dp[i][j], dp[i+1][j] + 1)
      }
      if (skateArr[i][j] < skateArr[i+1][j]) {
        dp[i+1][j] = Math.max(dp[i+1][j], dp[i][j] + 1)
      } 
      if (skateArr[i][j] < skateArr[i][j+1]) {
        dp[i][j+1] = Math.max(dp[i][j+1], dp[i][j] + 1)
        
      }
    }
  }
  for(let i = 0; i < dp.length; i++) {
    console.log(dp[i].toString())
  }
}

skate([
[1,2,3,4,5],
[16,17,18,19,6],
[15, 24, 25, 20, 7],
[14, 23, 22, 21, 8],
[13, 12, 11, 10, 9]
], 5, 5)