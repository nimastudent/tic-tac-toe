import React from 'react';
import './style.css';
import { chessStyle } from '../../utils/constant';

interface IChess {
    value: string | null;
    chessType: string;
    rowIndex:number;
    colIndex:number;
    handleClick: (rowIndex: number, colIndex:number) => void;
}

/**
 * 棋子组件
 * @param value 棋子的值
 * @param chessType 棋子类型
 */
const Chess: React.FC<IChess> = ({ value, chessType, rowIndex, colIndex, handleClick }) => {
    /** */
    const onPlay = () => {
        handleClick(rowIndex, colIndex);
    };

    return (
        chessType === 'ticChess'
            ? (<button onClick={onPlay} className="square">{value ? chessStyle[chessType][value] : ''}</button>)
            : (<button
                onClick={onPlay}
                className={`square ${value && chessStyle[chessType][value]}`}></button>)
    );
};

export default React.memo(Chess, (prev, next) => prev.value === next.value);
