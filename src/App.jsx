import { Player } from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";
import { Log } from "./components/Log";
import { GameOver } from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winningCombinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { field, player } = turn;
    const { row, col } = field;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstFieldSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondFieldSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdFieldSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstFieldSymbol &&
      firstFieldSymbol === secondFieldSymbol &&
      firstFieldSymbol === thirdFieldSymbol
    ) {
      winner = players[firstFieldSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const drawGame = gameTurns.length === 9 && !winner;
  const handleSelectField = (rowIndex, colIndex) => {
    setGameTurns((current) => {
      const currentPlayer = deriveActivePlayer(current);

      const updatedTurns = [
        { field: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...current,
      ];

      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((current) => ({ ...current, [symbol]: newName }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          Game Board
          <Player
            name="P1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name="P2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || drawGame) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        <GameBoard onSelectField={handleSelectField} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
