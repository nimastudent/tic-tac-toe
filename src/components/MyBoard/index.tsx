import { useEffect, useMemo, useState } from 'react';
import InitialData, { chessStyle } from '../../utils/constant';
import './style.css';
import { calculateWinner } from '../../utils/utils';
import MyChess from '../MyChess';

interface IBoardProps {
    gameType: string;
}

interface IStepObj {
    rowInd: number;
    cloInd: number;
    chess: string;
}

/**
 * 棋盘组件
 * @param gameType 游戏类型
 */
const MyBoard: React.FC<IBoardProps> = ({ gameType }) => {
    const [config] = useState(InitialData);
    const { boardSize, chessType } = config[gameType];
    const [squares, setSquares] = useState<Array<Array<string|null>>>(initSquares(boardSize));
    const [currentMove, setCurrentMove] = useState(0);
    const [stepHistory, setStepHistory] = useState<Array<IStepObj>>([{} as IStepObj]);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState<string|null>(null);

    /**
     * 棋局切换初始化函数
     * @param boardSize 棋局大小
     * @returns 棋局二维数组
     */
    function initSquares (boardSize :number) {
        return Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    }

    /**
     * 处理玩家点击棋盘函数
     * @params rowIndex 棋局行坐标
     * @params cloIndex 棋局列坐标
     */
    const onPlay = useMemo(() => (rowIndex: number, cloIndex: number) => {
        if (squares[rowIndex][cloIndex] || winner) return;
        const nextSquares = squares.slice();
        const nextHistory = stepHistory.slice(0, currentMove + 1);
        let putChess;
        if (xIsNext) {
            putChess = '1';
        } else {
            putChess = '0';
        }
        nextSquares[rowIndex][cloIndex] = putChess;
        nextHistory.push({
            rowInd: rowIndex,
            cloInd: cloIndex,
            chess: putChess,
        });
        setXIsNext(!xIsNext);
        setSquares(nextSquares);
        setStepHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        const newWinner = calculateWinner(nextSquares, rowIndex, cloIndex, config[gameType]);
        setWinner(newWinner);
    }, [squares, xIsNext]);


    /**
     * 回退或者前进步数
     * @param move 前往步数
     */
    const jumpTo = (move: number) => {
        if (currentMove === move) return;
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
        const nextSquares = squares.slice();
        sliceHistory.forEach(({ rowInd, cloInd, chess }) => {
            nextSquares[rowInd][cloInd] = isChessNull ? null : chess;
        });
        setSquares(nextSquares);
        setXIsNext(move % 2 === 0);
        setCurrentMove(move);
        const { rowInd, cloInd } = stepHistory[move];
        const newWinner = rowInd ? calculateWinner(nextSquares, rowInd, cloInd, config[gameType]) : null;
        setWinner(newWinner);
    };

    useEffect(() => {
        const newSquares = initSquares(boardSize);
        setSquares(newSquares);
        setStepHistory([{} as IStepObj]);
        setCurrentMove(0);
        setXIsNext(true);
        setWinner(null);
    }, [boardSize]);

    let status;
    if (winner) {
        status = `winner is : ${chessStyle[chessType][winner]}`;
    } else {
        status = `next player is: ${xIsNext ? chessStyle[chessType]['1'] : chessStyle[chessType]['0']}`;
    }

    const moves = stepHistory.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = 'Go to game start';
        }
        return (<li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>);
    });

    return (
        <>
            <div>{status}</div>
            <div className='game'>
                <div className='container'>
                    {squares.map((rows, rowIndex) => {
                        return (<div key={rowIndex}>
                            {rows.map((cloumn, cloIndex) => {
                                return (
                                    <span key={`${rowIndex}-${cloIndex}`}
                                        onClick={() => onPlay(rowIndex, cloIndex)}
                                    >
                                        <MyChess
                                            value={squares[rowIndex][cloIndex]}
                                            chessType={chessType}
                                        />
                                    </span>
                                );
                            })}
                        </div>);
                    })}
                </div>
                <div className='game-info'>
                    {moves}
                </div>
            </div>
        </>
    );
};

export default MyBoard;
