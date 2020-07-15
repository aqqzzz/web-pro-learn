/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const rows = grid.length;
    const columns = grid[0].length;
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (grid[r][c] === '1') {
                count++;
                bfs(grid, r, c)
            }
        }
    }
    return count
};

// 深度优先遍历
var dfs = function(grid, r, c) {
    const rows = grid.length;
    const columns = grid[0].length;
    if (r >= rows || c >= columns || r < 0 || c < 0 || grid[r][c] === '0') {
        return
    }
    grid[r][c] = '0'
    dfs(grid, r-1, c)
    dfs(grid, r+1, c)
    dfs(grid, r, c-1)
    dfs(grid, r, c+1)
}

// 广度优先遍历
// 原理是使用一个队列存储当前处理过的1的位置，先进先出，每个1都要检查四个方向上相邻的1，并对其进行处理，直到该队列清空，说明相邻的1都处理过了
// 一个小技巧是可以将row和column转换为计数推入队列中
// 需要注意的部分是：要先修改当前位置的1为0，再将其推入处理队列，否则会进行多余的计算
var bfs = function(grid, r, c) {
    const temp = []
    const rowLength = grid.length
    const columnLength = grid[0].length
    grid[r][c] = '0'
    temp.push(r*columnLength + c)
    while(temp.length > 0) {
        const cur = temp.splice(0, 1)
        const row = Math.floor(cur / columnLength)
        const column = cur % columnLength
        if (row + 1 < rowLength && grid[row+1][column] === '1') {
            // 【注意】将该区域内容置为0后再推入目标数组
            grid[row + 1][column] = '0'
            temp.push((row+1)*columnLength + column)
        }
        if (row - 1 >= 0 && grid[row-1][column] === '1') {
            grid[row - 1][column] = '0'
            temp.push((row-1)*columnLength + column)
        }
        if (column + 1 < columnLength && grid[row][column+1] === '1') {
            grid[row][column + 1] = '0'
            temp.push(row*columnLength + column+1)
        }
        if (column - 1 >= 0 && grid[row][column-1] === '1') {
            grid[row][column - 1] = '0'
            temp.push(row*columnLength + column-1)
        }
    }
}

console.log(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))