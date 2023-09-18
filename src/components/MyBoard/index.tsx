import {  useCallback, useEffect, useState } from 'react';
import InitialData from '../../utils/constant';
import Chess from '../MyChess';
import './style.css';

interface IBoardProps {
    gameType: string;
}

/**
 *
 * @returns
 */
const MyBoard: React.FC<IBoardProps> = ({ gameType }) => {
    const { boardSize, chessType } = InitialData[gameType];
    const [squares, setSquares] = useState<Array<Array<string|null>>>(initSquares(boardSize));
    // const [currentMove] = useState(0);
    // const [stepHistory] = useState([]);
    const [xIsNext, setXIsNext] = useState(true);
    /**
     *
     */
    function initSquares (boardSize :number) {
        return Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    }

    /**
     *
     */
    const onPlay = (rowIndex: number, cloIndex: number) => {
        const currentSquares = squares;
        if (xIsNext) {
            currentSquares[rowIndex][cloIndex] = '1';
        } else {
            currentSquares[rowIndex][cloIndex] = '0';
        }
        setXIsNext(!xIsNext);
        setSquares(currentSquares);
        console.log(rowIndex, cloIndex, squares === currentSquares);
    };

    // useEffect(() => {
    //     setSquares(initSquares(boardSize));
    // }, [boardSize]);

    return (
        <div className='container'>
            {squares.map((rows, rowIndex) => {
                return (<div key={rowIndex}>
                    {rows.map((cloumn, cloIndex) => {
                        return (
                            <Chess key={`${rowIndex}-${cloIndex}`}
                                value={squares[rowIndex][cloIndex]}
                                chessType={chessType}
                                onPlay={() => onPlay(rowIndex, cloIndex)}
                            />
                        );
                    })}
                </div>);
            })}

        </div>
    );
};

export default MyBoard;
