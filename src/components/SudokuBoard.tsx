import React from 'react';

interface SudokuBoardProps {
  puzzle: number[][];
  onCellChange: (row: number, col: number, value: number) => void;
}

export function SudokuBoard({ puzzle, onCellChange }: SudokuBoardProps) {
  return (
    <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 max-w-md mx-auto">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            min="1"
            max="9"
            value={cell || ''}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : 0;
              if (value >= 0 && value <= 9) {
                onCellChange(rowIndex, colIndex, value);
              }
            }}
            className={`w-10 h-10 text-center border ${
              (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
                ? 'bg-white'
                : 'bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
        ))
      )}
    </div>
  );
}