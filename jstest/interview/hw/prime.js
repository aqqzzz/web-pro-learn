// 计算质数因子
function prime(num) {
  for (let i = 2; i <= num; i++) {
    if (num % i === 0) {
      num = num / i
      console.log(i)
      i = 1
    }
  }
}
prime(180)