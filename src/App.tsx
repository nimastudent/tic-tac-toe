import React, { useState } from 'react';
import MyBoard from './components/MyBoard';

/**
 */
function App () {
    const [gameType, setGameType] = useState<string>('five');

    /**
     * 处理用户选择游戏类型
     * @param event 用户点击事件
     */
    function handleGameTypeChange (event:React.ChangeEvent<HTMLSelectElement>) {
        setGameType(event.target.value);
    }

    return (

        <div className="App">
            <label
            >choose your game
                <select value={gameType} onChange={(eve) => handleGameTypeChange(eve)}>
                    <option value="tic">井字棋</option>
                    <option value="five">五子棋</option>
                </select>
            </label>
            <MyBoard gameType={gameType} />
        </div>
    );
}

export default App;
