type tSquaers = Array<Array<string | null>>
/**
 * 计算井字棋游戏是否结束
 * @param squares 棋局
 * @returns 胜者
 */
export function calculateWinner (squares: tSquaers) {
    // 行
    for (let rows = 0; rows < 3; rows++) {
        if (
            squares[rows][0] === squares[rows][1] &&
            squares[rows][1] === squares[rows][2]
        ) {
            return squares[rows][0];
        }
    }
    // 列
    for (let cols = 0; cols < 3; cols++) {
        if (
            squares[0][cols] === squares[1][cols] &&
            squares[1][cols] === squares[2][cols]
        ) {
            return squares[0][cols];
        }
    }
    // 对角线
    if (squares[0][0] === squares[1][1] && squares[1][1] === squares[2][2]) {
        return squares[0][0];
    }
    if (squares[0][2] === squares[1][1] && squares[1][1] === squares[2][0]) {
        return squares[0][2];
    }
    return null;
}

/**
 * 游戏是否终止
 * @param squares 棋盘
 * @returns 是否终止
 */
function isGameOver (squares: tSquaers) {
    if (calculateWinner(squares)) {
        return true;
    }
    return !squares.flat().includes(null);
}

/**
 * 下一个落子玩家
 * @param squares 棋盘
 * @returns '1' | '0'
 */
function nextPlayer (squares: tSquaers) {
    let oneCount = 0;
    let zeroCount = 0;
    squares.flat()
        .forEach((item:string | null) => {
            if (item === '1') {
                oneCount++;
            } else if (item === '0') {
                zeroCount++;
            }
        });
    return oneCount > zeroCount ? '0' : '1';
}

/**
 * 还没有落子的位置
 * @param squares 棋局
 */
function actions (squares: tSquaers) {
    const res = [];
    for (let ii = 0; ii < squares.length; ii++) {
        for (let jj = 0; jj < squares[ii].length; jj++) {
            if (squares[ii][jj] === null) res.push([ii, jj]);
        }
    }
    return res;
}

/**
 * 棋局估值
 * @param squares 棋盘
 * @param isAIFirst ai是否先手
 * @returns 100 -100 0
 */
function evaluate (squares: tSquaers, isAIFirst: boolean) {
    const winner = calculateWinner(squares);
    const aiChes = isAIFirst ? '1' : '0';
    const useChess = isAIFirst ? '0' : '1';
    // ai胜利
    if (winner === aiChes) return 100;
    // ai失败
    if (winner === useChess) return -100;
    return 0;
}


/**
 * 返回落子后的棋盘
 * @param squares 棋盘
 * @param param1 落子位置
 * @returns 新的棋盘
 */
function resultAfterSet (squares: tSquaers, [row, col] : number[]) {
    const newSquares = JSON.parse(JSON.stringify(squares));
    const chess = nextPlayer(newSquares);
    newSquares[row][col] = chess;
    return newSquares;
}

/**
 * ai计算方法
 * @param squares 棋盘
 * @param isAIFirst ai是否先手
 * @returns ai落子位置
 */
export function aiPlay (
    squares: tSquaers,
    isAIFirst: boolean
) {
    const couldSetPos = actions(squares);
    let bestMove;
    let min = -10;
    for (const item of couldSetPos) {
        const newSquares = resultAfterSet(squares, item);
        const val = minValue(newSquares, -10, 10, isAIFirst);
        if (val >= min) {
            min = val;
            bestMove = item;
        }
    }
    return bestMove;
}

/**
 * 极大值搜索
 * @param squares 棋盘
 * @param alpha 最小值
 * @param beta 最大值
 * @param isAIFirst ai是否先手
 * @returns 最大值
 */
function maxValue (
    squares: tSquaers,
    alpha: number,
    beta: number,
    isAIFirst: boolean,
) {
    if (isGameOver(squares)) {
        return evaluate(squares, isAIFirst);
    }
    let v2 = -10;
    for (const item of actions(squares)) {
        const nextSquares = resultAfterSet(squares, item);
        const minVal = minValue(nextSquares, alpha, beta, isAIFirst);
        v2 = Math.max(v2, minVal);
        if (v2 >= beta) {
            return v2;
        }
        alpha = Math.max(alpha, v2);
    }
    return v2;
}

/**
 * 极小值搜索
 * @param squares 棋盘
 * @param alpha 最小值
 * @param beta 最大值
 * @param isAIFirst ai是否先手
 * @returns 最小值
 */
function minValue (
    squares: tSquaers,
    alpha: number,
    beta: number,
    isAIFirst: boolean,
) {
    if (isGameOver(squares)) {
        return evaluate(squares, isAIFirst);
    }

    let v3 = 10;
    for (const item of actions(squares)) {
        const nextSquares = resultAfterSet(squares, item);
        const maxVal = maxValue(nextSquares, alpha, beta, isAIFirst);
        v3 = Math.min(v3, maxVal);
        if (v3 <= alpha) {
            return v3;
        }
        beta = Math.min(beta, v3);
    }

    return v3;
}
