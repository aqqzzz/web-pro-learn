// 海拔高度计算路径条数
/**
 * 一张N*M的地图，用空格隔开
 * N行输入，每行M个整数用空格隔开，代表对应位置的海拔高度
 * 最后一行四个整数代表 起始点 和 目标点的位置
 * 从当前点只能访问上、下、左、右四个点中没有到过的点，而且下一步海拔高度必须高于当前点
 * 求出路径条数除以 10^9 的余数
 */
function findRoads(roadMap, n, m, flagMap, start, end, count) {
  const startX = parseInt(start[0])
  const startY = parseInt(start[1])
  const endX = parseInt(end[0])
  const endY = parseInt(end[1])
  let stepCount = 0
  if (flagMap[startX][startY]) {
    return count
  }
  if (startX === endX && startY === endY) {
    return count + 1
  } else {
    flagMap[startX][startY] = true
  }
  if (startX < n - 1 && roadMap[startX][startY] < roadMap[startX + 1][startY]) {
    stepCount += findRoads(roadMap, n, m, flagMap, [startX + 1, startY], end, count)
  }
  if (startX > 0 && roadMap[startX][startY] < roadMap[startX - 1][startY]) {
    stepCount += findRoads(roadMap, n, m, flagMap, [startX - 1, startY], end, count)
  }
  if (startY < m - 1 && roadMap[startX][startY] < roadMap[startX][startY + 1]) {
    stepCount += findRoads(roadMap, n, m, flagMap, [startX, startY + 1], end, count)
  } 
  if (startY > 0 && roadMap[startX][startY] < roadMap[startX][startY - 1]) {
    stepCount += findRoads(roadMap, n, m, flagMap, [startX, startY - 1], end, count)
  }
  flagMap[startX][startY] = false
  // 不满足以上所有条件，说明这条路到不了end
  return count + stepCount
}

const n = 4
const m = 5
let roadMap = new Array(4).fill(0)
const flagMap = new Array(4).fill(0)
const inputStrs = ['0 1 0 0 0', '0 2 3 0 0', '0 3 4 5 0', '0 4 7 6 0']

for (let i = 0; i < inputStrs.length; i++) {
  roadMap[i] = inputStrs[i].split(' ')

  flagMap[i] = new Array(5).fill(false)
}
const indexInput = '0 1 3 2'.split(' ')
const start = indexInput.slice(0, 2)
const end = indexInput.slice(2)

const res = findRoads(roadMap, n, m, flagMap, start, end, 0)
console.log(res)