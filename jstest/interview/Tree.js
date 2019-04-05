// const prevArr = [6, 4, 2, 5, 3, 1, 7]
// const midArr = [4, 2, 5, 6, 1, 3, 7]
const prevArr = ['8', '2', '1', '3', '6', '5', '4', '7', 'x', '9']
const midArr = ['3', '1', '6', '2', '5', '8', '7', 'x', '4', '9']
function findPostArr(arr1, arr2) {
  const prevArr = arr1.slice()
  const midArr = arr2.slice()
  const rootNode = prevArr[0]
  const midIndex = midArr.indexOf(rootNode)
  const left = midArr.slice(0, midIndex)
  const right = midArr.slice(midIndex + 1)
  const prevLeft = prevArr.slice(1, midIndex + 1)
  const prevRight = prevArr.slice(midIndex + 1)
  if (prevArr.length <= 3) {
    if (prevArr.toString() === midArr.toString()) {
      prevArr.reverse()
      return prevArr
    } else {
      return prevArr.slice(1).concat(prevArr[0])
    }
  } else {
    return findPostArr(prevLeft, left).concat(findPostArr(prevRight, right)).concat(midArr[midIndex])
  }

}

const postArr = findPostArr(prevArr, midArr).join(' ')
console.log(postArr)