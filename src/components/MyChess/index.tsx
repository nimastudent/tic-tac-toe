import React from "react";
import './style.css';

interface IChess {
    value: string | null;
    chessType: string;
    onPlay: () => void;
}
/**
 *
 * @returns
 */
const Chess: React.FC<IChess> = ({ value, chessType, onPlay }) => {
    console.error(value);
    /**
     *
     */
    const onChessClick = () => {
        onPlay();
    };
    return (
        chessType === 'ticChess'
            // eslint-disable-next-line no-nested-ternary
            ? (<button className="square" onClick={onChessClick}>{value === null ? '' : value === '1' ? 'X' : 'O'}</button>)
            : (<button className={`square ${value && value === '1' ? 'black' : ''} ${value && value === '0' ? 'white' : ''}`} onClick={onChessClick}></button>)
    );
};

// 使用 React.memo
export default React.memo(Chess, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
});
