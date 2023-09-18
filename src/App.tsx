import React from 'react';
import MyBoard from './components/MyBoard';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { changeGameType } from './store/featrues/game';
import { eGameType } from './utils/constant';

/**
 */
function App () {
    const gameType = useAppSelector((state) => state.game.gameType);
    const dispatch = useAppDispatch();

    /**
     * 处理用户选择游戏类型
     * @param event 用户点击事件
     */
    function handleGameTypeChange (event:React.ChangeEvent<HTMLSelectElement>) {
        dispatch(changeGameType(event.target.value));
    }

    return (
        <div className="App">
            <label
            >choose your game
                <select value={gameType} onChange={(eve) => handleGameTypeChange(eve)}>
                    <option value={eGameType.TIC}>井字棋</option>
                    <option value={eGameType.FIVE}>五子棋</option>
                </select>
            </label>
            <MyBoard />
        </div>
    );
}

export default App;
