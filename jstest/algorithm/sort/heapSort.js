// 堆排序
// index 元素左孩子节点为 2*index + 1，右孩子节点为 2*index + 2
function buildHeap(arr) {
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    maxHeapify(arr, i)
  }
}

// 改进，可以在这个函数中传入一个length参数，这样就不用每次更新arr，即只要对length范围内arr的内容进行堆调整即可
var maxHeapify = function(arr, rootIndex) {
  if (rootIndex > Math.floor(arr.length / 2)) {
    return
  } else {
    const leftIndex = 2*rootIndex + 1
    const rightIndex = 2*rootIndex + 2
    let maxIndex = rootIndex
    // 左孩子如果没超出数组长度的，且左孩子数字比当前maxIndex的数字大，则maxIndex更新为左孩子index
    if (leftIndex <= arr.length - 1 && arr[leftIndex] > arr[maxIndex]) {
      maxIndex = leftIndex
    }
    // 右孩子如果没超出数组长度，且右孩子数字比当前maxIndex的数字大，则maxIndex更新为右孩子index
    if (rightIndex <= arr.length - 1 && arr[rightIndex] > arr[maxIndex]) {
      maxIndex = rightIndex
    }
    // 若maxIndex不为rootIndex，则说明发生了交换
    if (rootIndex !== maxIndex) {
      swap(arr, maxIndex, rootIndex)
      if (maxIndex === leftIndex) {
        maxHeapify(arr, leftIndex) // 交换之后需要对左孩子和右孩子节点重新进行最大堆调整
      } else {
        maxHeapify(arr, rightIndex)
      }
    }
    
  }
}

var swap = function(arr, i, j) {
  const tmp = arr[j]
  arr[j] = arr[i]
  arr[i] = tmp
}
// 根据最大堆构建效果进行排序
const sort = function(arr) {
  let res = []
  let i = arr.length - 1
  while(i = arr.length - 1) {
    res.push(arr[0])
    swap(arr, i, 0)
    arr = arr.slice(0, i)
    maxHeapify(arr, 0)
  }
  res.push(arr[i])

  return res
}
const arr = [91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31, 77, 81, 22]
buildHeap(arr)
console.log(arr.join(','))
const res = sort(arr)
console.log(res.join(','))

