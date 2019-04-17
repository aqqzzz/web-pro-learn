// 数组降维
function flatten(arr) {
  // for (let i in arguments) {
  //   console.log(i, arguments[i])
  // }
  return arr.reduce((prevArr, cur) => {
    if (cur === null) {
      return prevArr
    } 
    if (!Array.isArray(cur)) {
      return prevArr.concat(cur)
    } else {
      return prevArr.concat(flatten(cur))
    }
  }, [])
}

console.log(flatten([1, 2, [3, 4, [{a: 5}, 6]]]))