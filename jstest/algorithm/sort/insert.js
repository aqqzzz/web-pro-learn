function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    const current = arr[i] // 取出当前即将插入有序数列的数据
    while (j >= 0 && arr[j] > current) { // 如果未到达头部，且当前位置j上的元素比 待插入元素大，则继续向前
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = current // 多减了1
  }
}
// 排序算法假设当前i之前所有的数据都是有序的
arr = [4, 1, 3, 2, 9, 5, 6]
insertSort(arr)
console.log(arr)

/**
 * 算法分析：in-place算法，不占用额外空间
 * 最好情况下，已排序数组，O(n)
 * 最坏情况下，反序，O(n^2)
 */