export const Log = ({ turns }) => {
  console.log(turns);

  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.field.row}-${turn.field.col}`}>
          {turn.player} placed in row {Number(turn.field.row) + 1} column{" "}
          {Number(turn.field.col) + 1}
        </li>
      ))}
    </ol>
  );
};
