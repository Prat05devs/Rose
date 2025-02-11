import React from 'react';

interface SudokuGameProps {
  puzzle: number[][];
  onSolve: (solution: number[][]) => void;
}

export function SudokuGame({ puzzle, onSolve }: SudokuGameProps) {
  const [grid, setGrid] = React.useState<number[][]>(puzzle);

  const isValidMove = (row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }

    // Check 3x3 box
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    if (puzzle[row][col] === 0 && (value === 0 || isValidMove(row, col, value))) {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = value;
      setGrid(newGrid);
      
      // Check if puzzle is complete
      const isComplete = newGrid.every(row => row.every(cell => cell !== 0));
      if (isComplete) {
        onSolve(newGrid);
      }
    }
  };

  return (
    <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 max-w-md mx-auto">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            min="1"
            max="9"
            value={cell || ''}
            disabled={puzzle[rowIndex][colIndex] !== 0}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : 0;
              if (value >= 0 && value <= 9) {
                handleCellChange(rowIndex, colIndex, value);
              }
            }}
            className={`w-10 h-10 text-center border ${
              puzzle[rowIndex][colIndex] !== 0 ? 'bg-gray-100' : 'bg-white'
            } ${
              (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
                ? 'bg-opacity-50'
                : ''
            } focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:text-gray-700 disabled:bg-gray-100`}
          />
        ))
      )}
    </div>
  );
}