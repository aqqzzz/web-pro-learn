function encode(input) {
  if (input.indexOf('?') >= 0 && input.indexOf('http') === 0) {
    input = input.slice(input.indexOf('?') + 1)
  }
  const inputs = input.split('&')
  let res = {}
  for(let i = 0; i < inputs.length; i++) {
    const cur = inputs[i].split('=')
    const bodyStr = escape(cur.slice(1).join(''))
    let body = bodyStr
    if (unescape(bodyStr).indexOf('http') >= 0) {
      body = encode(bodyStr) // 如何判断当前处于哪一层，该层的&应该被split但是该层之下的其余层不应该被split
    }
    res[cur[0]] = body
  }
  return res
}

// var input = readline()
// try {
//   print(JSON.stringify(encode(JSON.parse(input))))
// } catch(error) {
//   print(input + ' ' + error.message)
// }
console.log(encode("a=b&c=d&e=http://c.trip.com?a=b&c=d"))
console.log(unescape(escape("http://c.trip.com?a=b&c=d")))