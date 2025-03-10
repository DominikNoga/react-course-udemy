import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { checkForWin, getActivePlayer, getGameBoard, getOppositePlayer } from "./helpers/game-logic";
import { initialGameBoard } from "./constants/const";
import GameOver from "./components/GameOver";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = getGameBoard(initialGameBoard, gameTurns);
  const winner = checkForWin(gameBoard, getOppositePlayer(activePlayer));
  const isDraw = gameTurns.length === 9 && !winner;

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

  const onRematchClick = () => {
    setGameTurns([]);
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
        { (winner || isDraw) && <GameOver winner={winner} onRematchClick={onRematchClick}/> }
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
