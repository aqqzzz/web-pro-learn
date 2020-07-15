/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
    const odds = []
    let count = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] & 1) {
            odds.push(i)
        }
    }
    odds.splice(0, 0, -1)
    odds.push(nums.length)
    console.log(odds)

    for (let i = 1; i < odds.length - k; i++) {
        const preEvenNum = odds[i] - odds[i-1]
        const nextEvenNum = odds[i + k] - odds[i + k - 1]
        count += preEvenNum * nextEvenNum
    }
    return count
};

console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,2,2],2))