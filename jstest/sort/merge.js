// 将arr的左侧和右侧排序并返回
function mergeSort(arr) {
  var len = arr.length
  if (len < 2) {
    return arr
  }

  var middle = Math.floor(len / 2)
  var left = arr.slice(0, middle)
  var right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right)) // 递归
}

// 从left和right列表里，不断比较并取较小的数字放到结果数组
function merge(left, right) {
  var i = 0, j = 0
  var res = []
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }

  while (i < left.length) {
    res.push(left[i])
    i++
  }

  while (j < right.length) {
    res.push(right[j])
    j++
  }

  return res
}

const arr = [13, 2, 1, 4, 3, 6]
const res = mergeSort(arr)
console.log(res)

/**
 * 时间复杂度：O(nlogn)
 * 需要额外的空间
 */