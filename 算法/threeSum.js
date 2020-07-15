/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const result = [];
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        const target = -nums[i];
        if (target < 0) {
            break
        }
        if (nums[i] === nums[i-1]) {
            continue
        }
        let j = i + 1;
        let k = nums.length - 1;
        while (j < k) {
            if (nums[i] * nums[k] > 0 || nums[j] > target) {
                break
            }
            const curSum = nums[j] + nums[k]
            if (curSum === target) {
                result.push([nums[i], nums[j], nums[k]])
                
                while (j < k && nums[j] === nums[j + 1]) j++
                while (j < k && nums[k] === nums[k - 1]) k--
                j++, k--
            } else if (curSum > target) {
                k--
            } else {
                j++
            }
        }
        
    }
    return result
};