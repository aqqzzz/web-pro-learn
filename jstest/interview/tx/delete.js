function deleteJudge(str) {
  const pattern = /(\d)\1/g
  let i = 0
  let preLength = str.length
  while(str.length > 0 && str.match(pattern) != null) {
    str = str.replace(pattern, '')
    i += (str.length - preLength) / 2
    preLength = str.length
  }
  if (i % 2 !== 0) {
    console.log('Yes,you can win!')
  } else {
    console.log('oh,no.')
  }
}

deleteJudge('122133111')
// console.log('122133'.replace(/(\d)\1/g, ''))