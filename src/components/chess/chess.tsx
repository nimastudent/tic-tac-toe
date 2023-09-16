import React from 'react';
import './style.css';

interface IChessProps{
    value:null | string;
    handleUserClick:() => void;
}

/**
 * 五子棋棋子组件
 * @param value 该棋子的值
 * @param handleUserClick 点击棋子触发事件
 */
const Chess :React.FC<IChessProps> = ({ value, handleUserClick }) => {
    return (
        <button className={`square ${value && value === 'black' ? 'black' : ''} ${value && value === 'white' ? 'white' : ''}`} onClick={handleUserClick}></button>
    );
};

export default Chess;
