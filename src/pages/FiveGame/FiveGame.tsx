import { useState } from 'react';
import ChessBoard from '../../components/chessBoard/chessBoard';
import './style.css';
/**
 * 五子棋游戏组件
 */
const FiveGame = () => {
    const [blackIsNext, setBlackIsNext] = useState(true);
    const [histroy, setHistory] = useState<Array<Array<Array<string|null>>>>(Array(1).fill(null)
        .map(() => Array(15).fill(null)
            .map(() => Array(15).fill(null))));
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares: Array<Array<string|null>> = histroy[currentMove];

    /**
     * 处理用户点击后记录棋局
 */
    function handlePlay (nextQuares : Array<Array<string|null>>) {
        const nextHistory = [...histroy.slice(0, currentMove + 1), nextQuares];
        setHistory(nextHistory);
        setBlackIsNext(!blackIsNext);
        setCurrentMove(nextHistory.length - 1);
    }

    return (
        <div className="fiveGame">
            <ChessBoard blackIsNext={blackIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
    );
};

export default FiveGame;
