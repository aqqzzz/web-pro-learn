/**
 * 查找一个数组中出现数量大于一半的数字
 * [1,2,2,2,4,6,3,2] -> 2
 */

const findMode = (arr) => {
    let candi = undefined;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (count === 0) {
            candi = arr[i];
        }
        if (candi === arr[i]) {
            count++;
        } else {
            count--;
        }
    }
    return candi;
}

console.log(findMode([1,2,2,2,4,6,2]));
