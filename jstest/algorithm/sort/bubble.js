arr = [2, 4, 3, 5, 1, 9]
// 冒泡排序
for (let i = 0; i < arr.length; i++) {
  let j = 0
  let swap = false
  while (j < arr.length - i - 1) { // 从位置0开始，对比相邻两元素，把比较大的交换到后面去，for结束一次之后最后一个一定是最大的，下一次for循环就不用算这个了
    if (arr[j] > arr[j + 1]) {
      let tmp = arr[j + 1]
      arr[j + 1] = arr[j]
      arr[j] = tmp
      swap = true
    }
    j++
  }
  if (!swap) { // 如果某次循环没有交换数据，说明这前i个数据是排好序的，不需要再接着遍历了
    break
  }
}

console.log(arr)

/**
 * 算法分析：
 * 1. 最好情况O(n)
 * 2. 最坏情况 O(n^2)
 */