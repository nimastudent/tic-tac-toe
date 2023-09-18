import { chessStyle } from '../../utils/constant';
import './style.css';
import MyChess from '../MyChess';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getGameConfig,
    jumpToStore,
    onPlayStore,
} from '../../store/featrues/game';

/**
 * 棋盘组件
 * @param gameType 游戏类型
 */
const MyBoard = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.game);
    const { currentMove, squares, stepHistory, xIsNext, winner } = state;
    const gameConfig = useAppSelector((state) => getGameConfig(state));
    const { chessType } = gameConfig;

    /**
     * 处理玩家点击棋盘函数
     * @params rowIndex 棋局行坐标
     * @params cloIndex 棋局列坐标
     */
    const onPlay = (rowIndex: number, cloIndex: number) => {
        if (squares[rowIndex][cloIndex] || winner) return;
        dispatch(onPlayStore({ rowIndex, cloIndex }));
    };

    /**
     * 回退或者前进步数
     * @param move 前往步数
     */
    const jumpTo = (move: number) => {
        if (currentMove === move) return;
        dispatch(jumpToStore(move));
    };

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
