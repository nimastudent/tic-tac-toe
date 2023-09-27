import React from 'react';
import './style.css';
import { chessStyle } from '../../utils/constant';

interface IChess {
    value: string | null;
    chessType: string;
    handleClick: (rowIndex:number, colIndex:number) => void;
    rowIndex:number;
    colIndex:number;
}

/**
 * 棋子组件
 * @param value 棋子的值
 * @param rowInd 行坐标
 * @param colInd 列坐标
 * @param chessType 棋子类型
 * @param onPlay 点击棋子触发函数
 */
class Chess extends React.PureComponent<IChess> {
    constructor (props: IChess) {
        super(props);
    }


    render () {
        const { value, chessType, handleClick, rowIndex, colIndex } = this.props;

        return (
            chessType === 'ticChess'
                ? (<button
                    className="square" onClick={() => handleClick(rowIndex, colIndex)}>{value ? chessStyle[chessType][value] : ''}</button>)
                : (<button
                    onClick={() => handleClick(rowIndex, colIndex)}
                    className={`square 
                        ${value && chessStyle[chessType][value]}`}></button>)
        );
    }
}

export default Chess;
