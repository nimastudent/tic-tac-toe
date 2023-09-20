import { IGameConfig } from './constant';

/**
     * 搜索落子周围棋子进行计算胜者方法
     * @params quares 当前棋局数组
     * @params rowIndex 当前棋子落子行下标
     * @params itemIndex 当前棋子落子列下标
     * @returns 当前胜者
     */
export function calculateWinner (
    squares: Array<Array<string|null>>,
    rowIndex: number,
    itemIndex: number,
    gameConfig: IGameConfig
) {
    const { winCondition } = gameConfig;
    // 搜索方向数组 五子棋周围有8个方向 获胜计算根据一种方向 通过加减切换方向
    const caculArr =  [[-1, 0], [0, 1], [-1, -1], [-1, 1]];
    for (const [xAdd, yAdd] of caculArr) {
        const res = searchByDret(squares, rowIndex, itemIndex, xAdd, yAdd, gameConfig) +
        searchByDret(squares, rowIndex, itemIndex, -xAdd, -yAdd, gameConfig);
        if (res >= winCondition - 1) return squares[rowIndex][itemIndex];
    }
    return null;
}

/** */
function searchByDret (
    squares: Array<Array<string|null>>,
    row: number,
    col: number,
    xAdd: number,
    yAdd: number,
    config: IGameConfig
) {
    const { boardSize, winCondition } = config;
    let count = 0;
    let newRow = row + xAdd;
    let newCol = col + yAdd;
    while (newRow >= 0 &&
        newRow < boardSize &&
        newCol >= 0 &&
        newCol < boardSize &&
        squares[newRow][newCol] === squares[row][col] &&
        count <= winCondition - 1) {
        count++;
        newRow += xAdd;
        newCol += yAdd;
    }
    return count;
}

/**
 * 通过递归根据搜索方向查找连子个数
 * @param squares 当前棋局
 * @param rowInd 落子行下标
 * @param itemInd 落子列下标
 * @param rowAdd 搜索 行方向
 * @param itemAdd 搜索 列方向
 * @param temp 临时变量计算连子数
 * @returns 该方向上连子个数
 */
// function searchWinner (
//     squares:Array<Array<null|string>>,
//     rowInd:number,
//     itemInd:number,
//     rowAdd:number,
//     itemAdd:number,
//     temp:number,
//     gameConfig: IGameConfig
// ) :number {
//     const afterRowInd = rowInd + rowAdd;
//     const afterItemInd = itemInd + itemAdd;
//     const { boardSize, winCondition } = gameConfig;
//     // 判断下标是否越界
//     if (afterRowInd < 0 ||
//         afterRowInd >= boardSize ||
//         afterItemInd < 0 ||
//         afterItemInd >= boardSize) {
//         return temp;
//     }
//     // 判断是否为空或者颜色不同
//     const afterColor = squares[afterRowInd][afterItemInd];
//     if (afterColor === null || afterColor  !== squares[rowInd][itemInd]) {
//         return temp;
//     }
//     // 颜色相同临时变量增加
//     temp += 1;
//     if (temp === winCondition - 1) return temp;
//     return searchWinner(
//         squares,
//         afterRowInd,
//         afterItemInd,
//         rowAdd,
//         itemAdd,
//         temp,
//         gameConfig
//     );
// }

/**
 * 棋局切换初始化函数
 * @param boardSize 棋局大小
 * @returns 棋局二维数组
*/
export function initSquares (boardSize :number) {
    return Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
}
