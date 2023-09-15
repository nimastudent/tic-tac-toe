import { useState } from 'react';
import Board from '../../components/board/board';
import './style.css';

/**
* 井字棋游戏组件
*/
const TicGame = () => {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const currentSquares: Array<string | null> = history[currentMove];

    /**
    * 用户点击棋盘处理函数
    * @param nextSquares 点击后的棋局
    */
    function handlePlay (nextSquares: Array<string | null>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setXIsNext(!xIsNext);
        setCurrentMove(nextHistory.length - 1);
    }

    /**
     * 用户点击历史步骤处理函数
     * @param nextMove 跳转到哪一步
     */
    function jumpTo (nextMove:number) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = 'Go to game start';
        }

        return (<li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default TicGame;
