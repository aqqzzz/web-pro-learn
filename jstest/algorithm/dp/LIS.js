// 求最长上升子序列
function LIS(arr) {
  let f = new Array(arr.length).fill(1)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        f[i] = Math.max(f[i], f[j] + 1)
      }
    }
  }
  console.log(f.toString())
}

LIS([1, 5, 3, 4, 6, 9, 7, 8])