/**
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sliding-window-maximum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if (!nums || nums.length * k === 0) {
        return [];
    }
    // 双端队列
    const deque = [];
    let i = 0;
    for (i = 0; i < k; i++) {
        cleanDeque(deque, i, nums, k);
        deque.push(i);
    }


    const res = []
    for (i = k - 1; i < nums.length; i++) {
        cleanDeque(deque, i, nums, k);
        deque.push(i);
        res.push(nums[deque[0]]);
    }

    return res
};

// deque 记录滑动窗口数组的下标
function cleanDeque(deque, idx, nums, k) {
    if (deque.length > 0 && deque[0] + k < idx) {
        deque.shift();
    }
    while (nums[idx] > nums[deque[deque.length - 1]] && deque.length > 0) {
        deque.pop();
    }
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));