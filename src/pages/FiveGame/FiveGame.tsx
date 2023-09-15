import { useState } from 'react';
import ChessBoard from '../../components/chessBoard/chessBoard';
import './style.css';
import { calculateWinner } from '../../utils/utils';

/**
 * 五子棋游戏组件
 */
const FiveGame = () => {
    const [blackIsNext, setBlackIsNext] = useState(true);
    const [winner, setWinner] = useState<string|null>(null);
    // 历史记录数组为三维数组
    const [histroy, setHistory] = useState<Array<Array<Array<string|null>>>>(Array(1).fill(null)
        .map(() => Array(15).fill(null)
            .map(() => Array(15).fill(null))));
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares: Array<Array<string|null>> = histroy[currentMove];
    const [stepHistory, setStepHistory] = useState<Array<Array<number|null>>>([[null, null]]);

    /**
     * 处理用户点击后记录棋局
     * @param nextSquares 点击后棋局
     * @param nextStep 点击函数
     */
    function handlePlay (nextSquares: Array<Array<string|null>>, nextStep: Array<number>) {
        const nextHistory = [...histroy.slice(0, currentMove + 1), nextSquares];
        const nextStepHistory = [...stepHistory.slice(0, currentMove + 1), nextStep];
        setStepHistory(nextStepHistory);
        setHistory(nextHistory);
        setBlackIsNext(!blackIsNext);
        setCurrentMove(nextHistory.length - 1);
        const stepWinner = calculateWinner(nextSquares, nextStep[0], nextStep[1]);
        if (stepWinner) {
            setWinner(stepWinner);
        }
    }

    /**
     * 用户点击历史步骤处理函数
     * @param nextMove 跳转到哪一步
     */
    function jumpTo (nextMove:number) {
        setCurrentMove(nextMove);
        setBlackIsNext(nextMove % 2 === 0);
        const [rowInd, itemInd] = stepHistory[nextMove];
        if (rowInd && itemInd) {
            const stepWinner = calculateWinner(histroy[nextMove], rowInd, itemInd);
            setWinner(stepWinner);
        } else {
            setWinner(null);
        }
    }

    const moves = histroy.map((squares, move) => {
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
        <div className="fiveGame">
            <div>
                <ChessBoard winner={winner} blackIsNext={blackIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default FiveGame;
