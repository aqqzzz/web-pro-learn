// 金额加逗号的问题
function addComma(amount) {
  amount = amount.toString()
  let res = amount.replace(/(\d)(?=(?:\d{3})+$)/, '$1,') // 这里需要匹配的是以3个为单位的数字序列
  console.log(amount, res)
}
addComma(1000000)