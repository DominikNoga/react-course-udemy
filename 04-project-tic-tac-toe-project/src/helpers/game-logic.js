import { WINNING_COMBINATIONS } from "./winning-combinations";

export const getOppositePlayer = (player) => player === 'X' ? 'O' : 'X';

export const getActivePlayer = (turns) => turns.length ? getOppositePlayer(turns[0].player) : 'X';

export const checkForWin = (gameBoard, currentPlayer) => {
    let isWinner = false;
    for (const combination of WINNING_COMBINATIONS) {
        for (const { row, column: col } of combination) {
            isWinner = true;

            if (gameBoard[row][col] !== currentPlayer) {
                isWinner = false;
                break;
            }
        }

        if (isWinner)
            break;
    }
    return isWinner ? currentPlayer : null;
}

export const getGameBoard = (initialGameBoard, gameTurns) => {
    let gameBoard = [...initialGameBoard.map(row => [...row])];
    gameTurns.forEach(turn => {
        const {
            square: {
                row, col
            }, player
        } = turn;
        gameBoard[row][col] = player;
    });
    return gameBoard;
}