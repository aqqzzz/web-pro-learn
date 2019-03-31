function selectSort(arr) { // 选择排序
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i; j < arr.length; j++) { // 每次选择剩余队列中最小的元素放到对应位置i上去
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    const tmp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = tmp
  }
}

arr = [13, 2, 1, 4, 3, 6]
selectSort(arr)
console.log(arr)

/**
 * 算法分析：in-place
 * 不管什么情况都要对比所有的元素，时间复杂度为O(n^2)
 */