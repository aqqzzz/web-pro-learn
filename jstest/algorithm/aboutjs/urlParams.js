function getUrlParam(sUrl, sKey) {
  const regex = /\??(\w+)=(\w+)&?/g
  let res = {}
  sUrl.replace(regex, (match, p1, p2) => {
    if (res[p1] !== void 0) {
      var tmp = res[p1]
      res[p1] = [].concat(tmp, p2)
    } else {
      res[p1] = p2
    }
  })
  if (sKey !== void 0) {
    return res[sKey] || ''
  } else {
    return res
  }
  
}

console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe'))