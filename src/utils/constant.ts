export interface IGameConfig {
    boardSize: number;
    winCondition: number;
    chessType: eChessType;
}

interface iChessStyle {
    [key: string]: {[key: string]: string};
}

export enum eGameType {
    FIVE='five',
    TIC='tic'
}

export enum eChessType {
    CIRLECHESS='cirleChess',
    TICCHESS='ticChess',
}

export const chessStyle : iChessStyle = {
    [eChessType.CIRLECHESS]: {
        '1': 'black',
        '0': 'white',
    },
    [eChessType.TICCHESS]: {
        '1': 'X',
        '0': 'O',
    },
};

// 初始化配置
const InitialData:{[key: string]: IGameConfig} = {
    [eGameType.FIVE]: {
        boardSize: 15,
        winCondition: 5,
        chessType: eChessType.CIRLECHESS,
    },
    [eGameType.TIC]: {
        boardSize: 3,
        winCondition: 3,
        chessType: eChessType.TICCHESS,
    },
};

export default InitialData;
