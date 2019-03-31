function quickSort(arr, left, right) {
  let pivot = left // 基准元素
  let i = left + 1 // 左侧 i 指针
  let j = right // 右侧 j 指针
  if (i >= j) {
    return
  }
  // 右侧 j 指针先往左走，找到第一个小于pivot的元素停止，
  // 左侧 i 指针往右走，找到第一个大于pivot的元素停止
  // 交换 i 和 j
  while (i !== j) {
    while (arr[j] > arr[pivot] && i !== j) {
      j--
    }
    while (arr[i] < arr[pivot] && i !== j) {
      i++
    }
    if (i !== j) {
      swap(arr, i, j)
    }
  }
  // 找到 i 和 j 相遇的点，交换该点和pivot的元素
  swap(arr, pivot, i)
  if (i >= 1) {
    quickSort(arr, left, i - 1) // 对左侧列表进行排序
  }
  if (i <= right - 1) {
    quickSort(arr, i + 1, right) // 对右侧列表进行排序
  }
}

function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

let arr = [72, 6, 57, 88, 60, 42, 83, 73, 48, 85]
quickSort(arr, 0, arr.length - 1)
console.log(arr)

/**
 * 时间复杂度 O(nlogn)
 * 计数排序 O(n)
 * 桶排序
 * 基数排序（先排个位数再排十位数）
 * https://www.cnblogs.com/onepixel/articles/7674659.html
 */