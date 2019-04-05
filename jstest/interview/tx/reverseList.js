/**
 * 小Q定义了一种数列称为翻转数列:
给定整数n和m, 满足n能被2m整除。对于一串连续递增整数数列1, 2, 3, 4..., 每隔m个符号翻转一次, 最初符号为'-';。
例如n = 8, m = 2, 数列就是: -1, -2, +3, +4, -5, -6, +7, +8.
而n = 4, m = 1, 数列就是: -1, +2, -3, + 4.
小Q现在希望你能帮他算算前n项和为多少。
 */

function reverse(n, m) {
  let arr = new Array(n).fill(1).map((num, index) => { return num + index})
  arr = arr.map((num) => {
    if (Math.floor((num - 1) / m) % 2 === 0) {
      return -num
    } else {
      return num
    }
  })
  // console.log(arr)
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  console.log(sum)

}

reverse(4, 1)