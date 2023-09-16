import Chess from '../chess/chess';
import './style.css';

interface IChessBoard{
    winner: string|null;
    blackIsNext: boolean;
    squares: Array<Array<null|string>>;
    onPlay: (nextSquares: Array<Array<string|null>>, nextStep: Array<number>) => void;
}

/**
 * 五子棋棋盘组件
 * @param winner 胜者
 * @param blackIsNext 是否轮到黑子点击
 * @param squares 当前棋局
 * @param onPlay 棋局记录方法
 */
const ChessBoard :React.FC<IChessBoard> = ({ winner, blackIsNext, squares, onPlay }) => {
    /**
     * 处理用户点击函数
     * @params rowIndex 点击格子行下标
     * @params itemIndex 点击格子列下标
     */
    function handleClick (rowIdnex: number, itemIndex: number) {
        if (squares[rowIdnex][itemIndex] || winner) {
            return;
        }
        const nextSquares = JSON.parse(JSON.stringify(squares));
        if (blackIsNext) {
            nextSquares[rowIdnex][itemIndex] = 'black';
        } else {
            nextSquares[rowIdnex][itemIndex] = 'white';
        }
        onPlay(nextSquares, [rowIdnex, itemIndex]);
    }

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${blackIsNext ? 'black' : 'white'}`;
    }

    return (
        <div className="container">
            <div>{status}</div>
            {squares.map((row, rowIndex) => {
                return (
                    <div key={rowIndex}>{
                        row.map((item, itemIndex) => {
                            return <Chess key={`${rowIndex}-${itemIndex}`} handleUserClick={() => handleClick(rowIndex, itemIndex)} value={item} />;
                        })
                    }
                    </div>
                );
            })}
        </div>
    );
};

export default ChessBoard;
