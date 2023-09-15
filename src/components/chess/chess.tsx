import React from 'react';
import './style.css';

interface IChessProps{
    value:null | string;
    handleUserClick:() => void;
}

/**
 * 棋子组件
 */
const Chess :React.FC<IChessProps> = ({ value, handleUserClick }) => {
    return (
        <button className={`square ${value}`} onClick={handleUserClick}></button>
    );
};

export default Chess;
