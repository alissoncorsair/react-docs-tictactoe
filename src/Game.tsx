import { useEffect, useState } from "react";
import { Board } from "./Board";

export const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [shownSquares, setShownSquares] = useState(Array(9).fill(null));
  const [step, setStep] = useState(0);
  const xIsNext = step % 2 === 0;
  const currentSquares = history[history.length - 1];

  const handleClick = (squares: Array<String | null>) => {
    const newHistory = [...history.slice(0, step + 1), squares];
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  };

  useEffect(() => {
    setShownSquares(history[history.length - 1]);
  }, [history]);

  const jumpTo = (move: number) => {
    setShownSquares(history[move]);
    setStep(move);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={shownSquares}
          history={history}
          onPlay={handleClick}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
