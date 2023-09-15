import Chess from '../chess/chess';
import { searchWinner } from '../../utils/utils';
import './style.css';
import { useState } from 'react';

interface IChessBoard{
    blackIsNext: boolean;
    squares: Array<Array<null|string>>;
    onPlay: (nextSquares: Array<Array<string|null>>) => void;
}

/**
 * 五子棋棋盘组件
 */
const ChessBoard :React.FC<IChessBoard> = ({ blackIsNext, squares, onPlay }) => {
    const [winner, setWinner] = useState<null|string>(null);

    /**
     * 处理用户点击函数
     * @params rowIndex 点击格子行下标
     * @params itemIndex 点击格子列下标
     */
    function handleClick (rowIdnex: number, itemIndex: number) {
        if (squares[rowIdnex][itemIndex] || winner) {
            return;
        }
        const nextSquares = squares.slice();
        if (blackIsNext) {
            nextSquares[rowIdnex][itemIndex] = 'black';
        } else {
            nextSquares[rowIdnex][itemIndex] = 'white';
        }
        onPlay(nextSquares);
        calculateWinner(squares, rowIdnex, itemIndex);
    }

    /**
     * 搜索落子周围棋子进行计算胜者方法
     * @params quares 当前棋局数组
     * @params rowIndex 当前棋子落子行下标
     * @params itemIndex 当前棋子落子列下标
     */
    function calculateWinner (quares:any, rowIndex:number, itemIndex:number) {
        const currentChess = quares[rowIndex][itemIndex];
        // 搜索方向数组 五子棋周围有8个方向 获胜计算根据一种方向 所以将两个方向分为一组
        const caculArr =  [[[-1, 0], [1, 0]], [[0, 1], [0, -1]], [[-1, -1], [1, 1]], [[-1, 1], [1, -1]]];
        caculArr.forEach(direct => {
            // 方向ab
            const [[aRowAdd, aItemAdd], [bRowAdd, bItemAdd]] = direct;

            const aDireRes = searchWinner(squares, rowIndex, itemIndex, aRowAdd, aItemAdd, currentChess, 0);
            const bDireRes = searchWinner(squares, rowIndex, itemIndex, bRowAdd, bItemAdd, currentChess, 0);
            const totalCount = aDireRes + bDireRes;
            if (totalCount === 4) {
                setWinner(currentChess);
            }
        });
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
