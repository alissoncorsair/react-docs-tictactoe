import React, { useState } from "react";

interface SquareProps {
  value: String | null;
  onSquareClick?: () => void;
}

export const Square = ({ value, onSquareClick = () => {} }: SquareProps) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};
