import React from 'react';
import MyBoard from './components/MyBoard';
import { eGameType } from './utils/constant';
import { RootState } from './store';
import { connect } from 'react-redux';
import { changeGameType, changeIsAIFirst, onPlayStore } from './store/featrues/game';


interface IProps {
    gameType: string;
    isAIFirst: boolean;
    changeGameType: (gameType: eGameType) => void;
    changeIsAIFirst: (isAIFirst: boolean) => void;
    onPlayStore: (arg: any) => void;
}
class App extends React.Component<IProps> {
    constructor (props: IProps) {
        super(props);
    }

    /**
     * 处理切换游戏类型
    */
    handleGameTypeChange (event:React.ChangeEvent<HTMLSelectElement>) {
        this.props.changeGameType(event.target.value as eGameType);
    }

    /**
     * 处理ai先手切换
     */
    handleAiFirstChange (event:React.ChangeEvent<HTMLSelectElement>) {
        let nextIsAIFirst: boolean;
        if (event.target.value === 'ai') {
            nextIsAIFirst = true;
        } else {
            nextIsAIFirst = false;
        }
        const { isAIFirst, changeIsAIFirst } = this.props;
        if (isAIFirst === nextIsAIFirst) return;
        changeIsAIFirst(nextIsAIFirst);
    }

    render () {
        const { gameType, isAIFirst } = this.props;
        return (
            <div className="App">
                <label>choose your game ：
                    <select value={gameType} onChange={(eve) => this.handleGameTypeChange(eve)}>
                        <option value={eGameType.TIC}>井字棋</option>
                        <option value={eGameType.FIVE}>五子棋</option>
                    </select>
                </label>
                <br/>
                { gameType === eGameType.TIC && (
                    <label>who first play：
                        <select value={isAIFirst ? 'ai' : 'human'} onChange={(eve) => this.handleAiFirstChange(eve)}>
                            <option value='ai'>AI</option>
                            <option value='human'>human</option>
                        </select>
                    </label>
                )}
                <MyBoard />
            </div>
        );
    }
}

/**
 * 获取Store中的gameType
 */
const mapStateToProps = (state:RootState) => ({
    gameType: state.game.gameType,
    isAIFirst: state.game.isAIFirst,
});

export default connect(mapStateToProps, { changeGameType, changeIsAIFirst, onPlayStore })(App);
