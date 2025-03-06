import GameBoard from "./components/GameBoard"
import Players from "./components/Players"

function App() {
  return (
    <main>
      <div id="game-container">
        <Players />
        <GameBoard />
      </div>
    </main>
  )
}

export default App
