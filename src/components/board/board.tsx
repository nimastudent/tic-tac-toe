import Square from '../square/square';
import './style.css';

interface IBoardProps{
    xIsNext: boolean;
    squares: Array<string | null>;
    onPlay: (nextSquares: Array<string | null>) => void;
}

/**
 * 棋盘组件
 * @param xIsNext boolean
 * @param squares Array
 */
const Board :React.FC<IBoardProps> = ({ xIsNext, squares, onPlay }) => {
    /**
     * 处理点击棋盘
     * @param index 传入点击哪个格子
     */
    function handleClick (index: number) {
        if (calculateWinner(squares) || squares[index]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = 'X';
        } else {
            nextSquares[index] = 'O';
        }
        onPlay(nextSquares);
    }

    /**
     * 计算胜利者
     * @param squares 棋局
     */
    function calculateWinner (squares:Array<string|null>) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let ind = 0; ind < lines.length; ind++) {
            const [fir, sec, thr] = lines[ind];
            if (squares[fir] && squares[fir] === squares[sec] && squares[fir] === squares[thr]) {
                return squares[fir];
            }
        }
        return null;
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <>
            <div  className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
};

export default Board;
