/**
     * 搜索落子周围棋子进行计算胜者方法
     * @params quares 当前棋局数组
     * @params rowIndex 当前棋子落子行下标
     * @params itemIndex 当前棋子落子列下标
     */
export function calculateWinner (squares:any, rowIndex:number, itemIndex:number) {
    const currentChess = squares[rowIndex][itemIndex];
    // 搜索方向数组 五子棋周围有8个方向 获胜计算根据一种方向 所以将两个方向分为一组
    const caculArr =  [[[-1, 0], [1, 0]], [[0, 1], [0, -1]], [[-1, -1], [1, 1]], [[-1, 1], [1, -1]]];

    for (let ind = 0; ind < caculArr.length; ind++) {
        // 方向ab
        const [[aRowAdd, aItemAdd], [bRowAdd, bItemAdd]] = caculArr[ind];
        const aDireRes = searchWinner(squares, rowIndex, itemIndex, aRowAdd, aItemAdd, currentChess, 0);
        const bDireRes = searchWinner(squares, rowIndex, itemIndex, bRowAdd, bItemAdd, currentChess, 0);
        const totalCount = aDireRes + bDireRes;
        if (totalCount >= 4) {
            return currentChess;
        }
    }

    return null;
}

/**
 * 通过递归根据搜索方向查找连子个数
 * @param squares 当前棋局
 * @param rowInd 落子行下标
 * @param itemInd 落子列下标
 * @param rowAdd 搜索 行方向
 * @param itemAdd 搜索 列方向
 * @param color 目标颜色
 * @param temp 临时变量计算连子数
 * @returns 该方向上连子个数
 */
function searchWinner (squares:Array<Array<null|string>>, rowInd:number, itemInd:number, rowAdd:number, itemAdd:number, color:string, temp:number) :number {
    const afterRowInd = rowInd + rowAdd;
    const afterItemInd = itemInd + itemAdd;
    // 判断下标是否越界
    if (afterRowInd < 0 || afterRowInd >= 15 || afterItemInd < 0 || afterItemInd >= 15) {
        return temp;
    }
    // 判断是否为空或者颜色不同
    const afterColor = squares[afterRowInd][afterItemInd];
    if (afterColor === null || afterColor  !== color) {
        return temp;
    }
    // 颜色相同临时变量增加
    temp += 1;
    return searchWinner(squares, afterRowInd, afterItemInd, rowAdd, itemAdd, color, temp);
}
