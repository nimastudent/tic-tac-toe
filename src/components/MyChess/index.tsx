import React from 'react';
import './style.css';
import { chessStyle } from '../../utils/constant';

interface IChess {
    value: string | null;
    chessType: string;
    rowInd: number;
    colInd: number;
    onPlay: (rowInd: number, col: number) => void;
}

/**
 * 棋子组件
 * @param value 棋子的值
 * @param rowInd 行坐标
 * @param colInd 列坐标
 * @param chessType 棋子类型
 * @param onPlay 点击棋子触发函数
 */
const Chess: React.FC<IChess> = ({ value, rowInd, colInd, chessType, onPlay }) => {
    return (
        chessType === 'ticChess'
            ? (<button className="square"
                onClick={() => onPlay(rowInd, colInd)}>{value ? chessStyle[chessType][value] : ''}</button>)
            : (<button
                className={`square ${value && chessStyle[chessType][value]}`}
                onClick={() => onPlay(rowInd, colInd)}></button>)
    );
};

export default React.memo(Chess);
