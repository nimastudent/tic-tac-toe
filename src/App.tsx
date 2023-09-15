import React, { useState } from 'react';
import TicGame from './pages/TicGame/TicGame';
import FiveGame from './pages/FiveGame/FiveGame';

/**
 */
function App () {
    const [gameType, setGameType] = useState('fiveGame');

    /**
     * 处理用户选择游戏类型
     */
    function handleGameTypeChange (event:React.ChangeEvent<HTMLSelectElement>) {
        setGameType(event.target.value);
    }

    return (
        <div className="App">
            <label
            >choose your game
                <select value={gameType} onChange={(eve) => handleGameTypeChange(eve)}>
                    <option value="ticGame">井字棋</option>
                    <option value="fiveGame">五子棋</option>
                </select>
            </label>
            {gameType === 'ticGame' && <TicGame />}
            {gameType === 'fiveGame' && <FiveGame />}

        </div>
    );
}

export default App;
