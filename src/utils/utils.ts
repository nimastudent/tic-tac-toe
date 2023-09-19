import { IGame, chessStyle, eChessType } from './constant';

/**
     * 搜索落子周围棋子进行计算胜者方法
     * @params quares 当前棋局数组
     * @params rowIndex 当前棋子落子行下标
     * @params itemIndex 当前棋子落子列下标
     * @returns 当前胜者
     */
export function calculateWinner (squares:Array<Array<string|null>>, rowIndex:number, itemIndex:number, gameConfig: IGame) {
    const currentChess = squares[rowIndex][itemIndex];
    // 搜索方向数组 五子棋周围有8个方向 获胜计算根据一种方向 所以将两个方向分为一组
    const caculArr =  [[[-1, 0], [1, 0]], [[0, 1], [0, -1]], [[-1, -1], [1, 1]], [[-1, 1], [1, -1]]];
    for (let ind = 0; ind < caculArr.length; ind++) {
        // 方向ab
        const [[aRowAdd, aItemAdd], [bRowAdd, bItemAdd]] = caculArr[ind];
        const aDireRes = searchWinner(squares, rowIndex, itemIndex, aRowAdd, aItemAdd, 0, gameConfig);
        const bDireRes = searchWinner(squares, rowIndex, itemIndex, bRowAdd, bItemAdd, 0, gameConfig);
        const totalCount = aDireRes + bDireRes;
        if (totalCount >= gameConfig.winCondition - 1) {
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
 * @param temp 临时变量计算连子数
 * @returns 该方向上连子个数
 */
function searchWinner (
    squares:Array<Array<null|string>>,
    rowInd:number,
    itemInd:number,
    rowAdd:number,
    itemAdd:number,
    temp:number,
    gameConfig: IGame
) :number {
    const afterRowInd = rowInd + rowAdd;
    const afterItemInd = itemInd + itemAdd;
    const { boardSize, winCondition } = gameConfig;
    // 判断下标是否越界
    if (afterRowInd < 0 ||
        afterRowInd >= boardSize ||
        afterItemInd < 0 ||
        afterItemInd >= boardSize) {
        return temp;
    }
    // 判断是否为空或者颜色不同
    const afterColor = squares[afterRowInd][afterItemInd];
    if (afterColor === null || afterColor  !== squares[rowInd][itemInd]) {
        return temp;
    }
    // 颜色相同临时变量增加
    temp += 1;
    if (temp === winCondition - 1) return temp;
    return searchWinner(
        squares,
        afterRowInd,
        afterItemInd,
        rowAdd,
        itemAdd,
        temp,
        gameConfig
    );
}

/**
 * 根据游戏类型计算下一个玩家
 * @param chessType 棋子类型
 * @param xIsNext x是否为下一个
 * @returns 下一个玩家
 */
export function computedNextPlayer (chessType: string, xIsNext: boolean) {
    let res;
    switch (chessType) {
        case eChessType.CIRLECHESS:
            res = xIsNext ? chessStyle[chessType]['1'] : 'white';
            break;
        case eChessType.TICCHESS:
            res = xIsNext ? 'X' : 'O';
            break;
        default:
            break;
    }
    return res;
}
