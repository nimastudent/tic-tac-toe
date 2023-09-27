import { IGameConfig, chessStyle, eGameType } from '../../utils/constant';
import './style.css';
import MyChess from '../MyChess';
import React from 'react';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { jumpToStore, onPlayStore } from '../../store/featrues/game';
import { aiPlay } from '../../utils/ai';

interface IBoardProps {
    isAIFirst: boolean;
    config: IGameConfig;
    squares: Array<Array<string | null>>;
    currentMove: number;
    stepHistory: Array<IStepObj>;
    xIsNext: boolean;
    winner: string | null;
    gameType: string;
    onPlayStore: (arg : any) => void;
    jumpToStore: (move: number) => void;
}


interface IStepObj {
    rowInd: number;
    cloInd: number;
    chess: string;
}

interface IState {
    waiting: boolean;
}

/**
 * 棋盘组件
 * @param gameType 游戏类型
 */
class MyBoard extends React.Component<IBoardProps, IState> {
    constructor (props: IBoardProps) {
        super(props);
        this.state = { waiting: false };
        this.onPlay = this.onPlay.bind(this);
    }


    /** */
    componentDidUpdate (): void {
        const { isAIFirst, currentMove, squares, onPlayStore, gameType, winner  } = this.props;
        // 是否为井字棋 且 没有胜者
        if (gameType === eGameType.TIC && !winner) {
            let aiStep;
            // ai先手 是否轮到ai
            if (isAIFirst && currentMove % 2 === 0) {
                aiStep = aiPlay(squares, isAIFirst) as unknown as number[];
            // ai后手是否轮到ai
            } else if (!isAIFirst && currentMove % 2 === 1) {
                aiStep = aiPlay(squares, isAIFirst) as unknown as number[];
            }
            if (!aiStep) return;
            const [rowIndex, cloIndex] = aiStep;
            onPlayStore({ rowIndex, cloIndex });
        }
    }

    /**
     * 处理玩家点击棋盘函数
     * @params rowIndex 棋局行坐标
     * @params cloIndex 棋局列坐标
     */
    onPlay (rowIndex: number, cloIndex: number) : void {
        const { squares, winner, onPlayStore } = this.props;
        if (squares[rowIndex][cloIndex] || winner) return;
        onPlayStore({ rowIndex, cloIndex });
    }

    /**
     * 回退或者前进步数
     * @param move 前往步数
      */
    jumpTo (move: number) {
        const { currentMove, jumpToStore } = this.props;
        if (currentMove === move) return;
        jumpToStore(move);
    }

    render () {
        const { config, squares, stepHistory, winner, xIsNext }  = this.props;
        const { chessType } = config;
        const moves = stepHistory.map((squares, move) => {
            let description;
            if (move > 0) {
                description = `Go to move #${move}`;
            } else {
                description = 'Go to game start';
            }
            return (<li key={move}>
                <button onClick={() => this.jumpTo(move)}>{description}</button>
            </li>);
        });

        let status;
        if (winner) {
            status = `winner is : ${chessStyle[chessType][winner]}`;
        } else {
            status = `next player is: ${xIsNext ? chessStyle[chessType]['1'] : chessStyle[chessType]['0']}`;
        }

        return (
            <>
                <div>{status}</div>
                <div className='game'>
                    <div className='container'>
                        {squares.map((rows, rowIndex) => {
                            return (<div key={rowIndex}>
                                {rows.map((cloumn, cloIndex) => {
                                    return (
                                        <MyChess
                                            key={`${rowIndex}-${cloIndex}`}
                                            rowIndex={rowIndex}
                                            colIndex={cloIndex}
                                            handleClick={this.onPlay}
                                            value={squares[rowIndex][cloIndex]}
                                            chessType={chessType}
                                        />
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
    }
}

/** */
const mapStateToProps = (state: RootState) => ({
    xIsNext: state.game.xIsNext,
    squares: state.game.squares,
    stepHistory: state.game.stepHistory,
    currentMove: state.game.currentMove,
    winner: state.game.winner,
    gameType: state.game.gameType,
    config: state.game.config,
    isAIFirst: state.game.isAIFirst,
});

export default connect(mapStateToProps, { onPlayStore, jumpToStore })(MyBoard);
