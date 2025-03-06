import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./helpers/winning-combinations";

const getOppositePlayer = (player) => player === 'X' ? 'O' : 'X';
const getActivePlayer = (turns) => turns.length ? getOppositePlayer(turns[0].player) : 'X';

const checkForWin = (updatedTurns, currentPlayer) => {
  let isWinner = false;
  for (const condition of WINNING_COMBINATIONS) {
    isWinner = true;
    for (const { square: { row, col } } of updatedTurns) {
      if (!condition.includes({ row, col })) {
        isWinner = false;
        break;
      }
    }
    if (isWinner)
      break;
  }

  console.log(isWinner);

  return isWinner ? currentPlayer : null;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);
  const hasWon = checkForWin(gameTurns, activePlayer);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <li className={activePlayer === 'X' ? 'active' : null}>
            <Player name='Player 1' symbol='X' />
          </li>
          <li className={activePlayer === 'O' ? 'active' : null}>
            <Player name='Player 2' symbol='O' />
          </li>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
