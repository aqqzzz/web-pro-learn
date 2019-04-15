// 大数相加
function add(str1, str2) {
  const maxLen = Math.max(str1.length, str2.length)
  let len1 = str1.length
  let len2 = str2.length
  const template = new Array(maxLen).fill('0').join('')
  str1 = template.replace(new RegExp(`-?\\d{${len1}}$`), str1)
  str2 = template.replace(new RegExp(`-?\\d{${len2}}$`), str2)
  let addon = 0
  let res = []
  for (let i = maxLen - 1; i >= 0; i--) {
    let cur = str1[i] * 1 + str2[i] * 1 + addon * 1
    cur = cur.toString()
    if (cur.length >= 2) {
      addon = cur.slice(0, cur.length - 1)
      res.unshift(cur.slice(cur.length - 1))
    } else {
      res.unshift(cur)
      addon = 0
    }
  }
  if (addon !== 0) {
    res.unshift(addon.toString())
  }
  return parseInt(res.join(''))
}

// 有符号的大数相加
function addOpd(str1, str2) {
  const sigArr = ['+', '-']
  let num1 = Math.abs(parseInt(str1)).toString()
  let num2 = Math.abs(parseInt(str2)).toString()
  const maxLen = Math.max(num1.length, num2.length)
  const template = new Array(maxLen).fill('0').join('')
  let opd1 = {
    sig: sigArr.indexOf(str1[0]) >= 0 ? str1[0] : '+',
    num: template.replace(new RegExp(`\\d{${num1.length}}$`), num1).split(''),
  }
  let opd2 = {
    sig: sigArr.indexOf(str2[0]) >= 0 ? str2[0] : '+',
    num: template.replace(new RegExp(`\\d{${num2.length}}`), num2).split('')
  }
  let res = []
  if (opd1.sig === opd2.sig) {
    // 两数相加
    let addon = 0
    for (let i = maxLen - 1; i >= 0; i--) {
      let cur = addon * 1 + opd1.num[i] * 1 + opd2.num[i] * 1
      cur = cur.toString()
      if (cur.length >= 2) {
        addon = cur.slice(0, cur.length - 1)
        res.unshift(cur.slice(cur.length - 1))
      } else {
        addon = '0'
        res.unshift(cur)
      }
    }
    if (addon != 0) {
      res.unshift(addon)
    }
    res = res.join('')
    return opd1.sig === '-' ? opd1.sig + res : res
  } else {
    // 总是大数减小数
    if (parseInt(opd2.num) > parseInt(opd1.num)) {
      const tmp = opd1
      opd1 = opd2
      opd2 = tmp
    }
    let borrow = 0
    for (let i = maxLen - 1; i > 0; i--) {
      let cur = opd1.num[i] * 1 + borrow * 10 - opd2.num[i] * 1
      let j = i - 1
      
      if (cur < 0) {
        // 减完了前一位也不足位的时候要怎么办
        opd1.num[i - 1] = opd1.num[i - 1] - 1
        borrow += 1
        cur = opd1.num[i] * 1 + borrow * 10 - opd2.num[i] * 1
      }
      borrow = 0
      res.unshift(cur)
    }
    if (opd1.num[0] - opd2.num[0] !== 0) {
      res.unshift(opd1.num[0] - opd2.num[0])

    }
    res = res.join('')
    return opd1.sig === '-' ? opd1.sig + res : res
  }
}

console.log(addOpd('-129', '1000'))