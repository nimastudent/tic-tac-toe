export interface IGame {
    boardSize: number;
    winCondition: number;
    chessType: string;
}

const InitialData: {[key:string]: IGame} = {
    five: {
        boardSize: 15,
        winCondition: 5,
        chessType: 'cirleChess',
    },
    tic: {
        boardSize: 3,
        winCondition: 3,
        chessType: 'ticChess',
    },
};

export default InitialData;
