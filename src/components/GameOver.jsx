export const GameOver = ({ winner, restart }) => {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button id="play-again" onClick={restart}>
          Play Again
        </button>
      </p>
    </div>
  );
};
