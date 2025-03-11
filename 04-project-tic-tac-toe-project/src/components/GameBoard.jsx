export default function GameBoard({onSelectSquare, gameBoard}) {
    const handlePlaceSelection = (row, col) => {
        onSelectSquare(row, col);
    }

    return (
        <ol id='game-board'>
            {
                gameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {
                                row.map((playerSymbol, colIndex) => (
                                    <li key={colIndex}>
                                        <button onClick={() => handlePlaceSelection(rowIndex, colIndex)} disabled={playerSymbol}>
                                            { playerSymbol }
                                        </button>
                                    </li>
                                ))
                            }
                        </ol>

                    </li>
                ))
            }
        </ol>
    )
}
