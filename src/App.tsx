import React from 'react';
import MyBoard from './components/MyBoard';
import { eGameType } from './utils/constant';
import { RootState } from './store';
import { connect } from 'react-redux';
import { changeGameType } from './store/featrues/game';

interface IProps {
    gameType: string;
    changeGameType: (gameType: eGameType) => void;
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

    render () {
        const { gameType } = this.props;
        return (
            <div className="App">
                <label>choose your game
                    <select value={gameType} onChange={(eve) => this.handleGameTypeChange(eve)}>
                        <option value={eGameType.TIC}>井字棋</option>
                        <option value={eGameType.FIVE}>五子棋</option>
                    </select>
                </label>
                <MyBoard />
            </div>
        );
    }
}

/**
 * 获取Store中的gameType
 */
const mapStateToProps = (state:RootState) => ({ gameType: state.game.gameType });

export default connect(mapStateToProps, { changeGameType })(App);
