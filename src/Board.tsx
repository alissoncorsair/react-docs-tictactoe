import { useState, useEffect } from "react";
import { Square } from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: Array<String | null>;
  onPlay: (squares: Array<String | null>) => void;
  history: Array<Array<String>>;
}

const calculateWinner = (squares: Array<String | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const Board = ({ onPlay, squares, xIsNext }: BoardProps) => {
  const [status, setStatus] = useState(`Next player: ${xIsNext ? "X" : "O"}`);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else {
      setStatus(`Next player: ${xIsNext ? "X" : "O"}`);
    }
  }, [squares]);

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const newSquares = [...squares];
    const character = xIsNext ? "X" : "O";
    newSquares[index] = newSquares[index] === null ? character : null;

    onPlay(newSquares);
  };
  return (
    <>
      <div className="flex">
        <div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
        <p>{status}</p>
      </div>
    </>
  );
};
