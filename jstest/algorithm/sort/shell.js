function shellSort(arr) {
  const len = arr.length
  for (let step = Math.floor(len / 2); step > 0; step = Math.floor(step / 2)) {
    // 对每个分组进行排序，从[0...step, step + 1, ... ,arr.length]，从step开始排，保证每次以k为间隔，i为结尾的数组中的元素都是有序的
    for (let i = step; i < arr.length; i++) {
      let j = i - step
      let current = arr[i]
      while (j >= 0 && current < arr[j]) {
        arr[j + step] = arr[j]
        j = j - step
      }
      arr[j + step] = current
    }
  }
}

arr = [13, 2, 1, 4, 3, 6]
shellSort(arr)
console.log(arr)

/**
 * 算法分析：
 * 1. 时间复杂度 O(nlog(2)n)
 */