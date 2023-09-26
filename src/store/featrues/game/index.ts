import { createSlice } from '@reduxjs/toolkit';
import InitialData, { IGameConfig, eGameType } from '../../../utils/constant';
import { calculateWinner, initSquares } from '../../../utils/utils';

interface IStepObj {
    rowInd: number;
    cloInd: number;
    chess: string;
}

interface IGame {
    isAIFirst: boolean;
    gameType: string;
    xIsNext: boolean;
    currentMove: number;
    squares: Array<Array<string|null>>;
    stepHistory: Array<IStepObj>;
    winner: string|null;
    config: IGameConfig;
}

const initialState: IGame = {
    isAIFirst: false,
    gameType: eGameType.TIC,
    xIsNext: true,
    currentMove: 0,
    squares: initSquares(InitialData[eGameType.TIC].boardSize),
    stepHistory: [{} as IStepObj],
    winner: null,
    config: InitialData[eGameType.TIC],
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeIsAIFirst: (state, action) => {
            state.isAIFirst = action.payload;
            state.squares = initSquares(InitialData[eGameType.TIC].boardSize);
            state.xIsNext = true;
            state.stepHistory = [{} as IStepObj];
            state.winner = null;
            state.currentMove = 0;
        },
        changeGameType: (state, action) => {
            const { gameType, gameHistory } = action.payload;
            if (!gameHistory) {
                state.config = InitialData[gameType];
                state.gameType = gameType;
                state.xIsNext = true;
                state.currentMove = 0;
                state.squares = initSquares(InitialData[gameType].boardSize);
                state.stepHistory = [{} as IStepObj];
                state.winner = null;
            } else {
                const { game } = gameHistory;
                state.gameType = game.gameType;
                state.config = game.config;
                state.xIsNext = game.xIsNext;
                state.currentMove = game.currentMove;
                state.squares = game.squares;
                state.stepHistory = game.stepHistory;
                state.winner = game.winner;
            }
        },
        /**
         * 玩家点击棋盘落子 更新state
         */
        onPlayStore: (state, action) => {
            const { rowIndex, cloIndex } = action.payload;
            const { xIsNext, squares, stepHistory, gameType, currentMove } = state;
            const nextSquares = squares.map((row) => row.slice());
            const nextStepHistory = stepHistory.slice(0, currentMove + 1);
            const putChess = xIsNext ? '1' : '0';
            nextSquares[rowIndex][cloIndex] = putChess;
            nextStepHistory.push({
                rowInd: rowIndex,
                cloInd: cloIndex,
                chess: putChess,
            });
            const nextIsXNext = !xIsNext;
            state.xIsNext = nextIsXNext;
            state.squares = nextSquares;
            state.stepHistory = nextStepHistory;
            state.currentMove = nextStepHistory.length - 1;
            const newWinner = calculateWinner(nextSquares, rowIndex, cloIndex, InitialData[gameType]);
            state.winner = newWinner;
        },
        /**
         * 跳转到棋盘的某个历史状态
         */
        jumpToStore: (state, action) => {
            const { currentMove, squares, gameType, stepHistory } = state;
            const move = action.payload;
            let sliceStart;
            let sliceEnd;
            let isChessNull: boolean;
            if (currentMove > move) {
                // 回滚
                sliceStart = move + 1;
                sliceEnd = currentMove + 1;
                isChessNull = true;
            } else {
                // 前进
                sliceStart = currentMove + 1;
                sliceEnd = move + 1;
                isChessNull = false;
            }
            const sliceHistory = stepHistory.slice(sliceStart, sliceEnd);
            const nextSquares = squares;
            sliceHistory.forEach(({ rowInd, cloInd, chess }) => {
                nextSquares[rowInd][cloInd] = isChessNull ? null : chess;
            });
            const { rowInd, cloInd } = stepHistory[move];
            const newWinner = rowInd ? calculateWinner(nextSquares, rowInd, cloInd, InitialData[gameType]) : null;
            state.winner = newWinner;
            state.squares = nextSquares;
            state.currentMove = move;
            state.xIsNext = move % 2 === 0;
        },
    },
});

export const {
    changeIsAIFirst,
    changeGameType,
    onPlayStore,
    jumpToStore,
} = gameSlice.actions;

export default gameSlice.reducer;
