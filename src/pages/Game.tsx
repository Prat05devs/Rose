import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SudokuBoard } from '../components/SudokuBoard';
import type { GameData } from '../types';
import sudoku from "../utils/sudoku.js";

import hmacSHA512 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { SECRET_KEY } from '../utils/constant.js';

export function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const x = sudoku()
  const [puzzle, setPuzzle] = React.useState<number[][]>(
    Array(9).fill(null).map(() => Array(9).fill(0))
  );
  const [gameData, setGameData] = React.useState<GameData | null>(null);

  React.useEffect(() => {
    // TODO: Fetch puzzle from backend
    const mockFetch = async () => {
      setGameData({
        puzzle: Array(9).fill(null).map(() => Array(9).fill(0)),
        name: location.state?.name || '',
        phoneNumber: location.state?.phoneNumber || '',
        difficulty: location.state?.difficulty || 1,
        hash: 'mock-hash'
      });
    };
    mockFetch();
  }, [location.state]);

  React.useEffect(() => {
    async function name() {
      let difficulty = 81 - (8 * (gameData?.difficulty ?? 1)); 
      let p = x.generate(difficulty, true)
      let newpuzzel = Array(9).fill(null).map(() => Array(9).fill(0)) 
      for (let i = 0; i < p.length; i++) {
        if (p[i] != '.') {
          newpuzzel[Math.floor(i/9)][i%9] = parseInt(p[i])
        }
        
      }
      setPuzzle(newpuzzel)
    }
    name()
  }, [gameData]);

  function isValidSudokuGrid(sudokuStr) {
    // Check if the input is exactly 81 characters long
    if (sudokuStr.length !== 81) return false;

    // Check if the string contains only digits 1-9
    if (!/^[1-9]{81}$/.test(sudokuStr)) return false;

    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid.push(sudokuStr.slice(i * 9, (i + 1) * 9).split("").map(Number));
    }

    return isValidSudoku(grid);
}

function isValidSudoku(grid) {
    // Helper function to check if an array contains unique numbers 1-9
    function hasUniqueNumbers(arr) {
        return new Set(arr).size === 9;
    }

    // Check rows
    for (let row of grid) {
        if (!hasUniqueNumbers(row)) return false;
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
        let column = grid.map(row => row[col]);
        if (!hasUniqueNumbers(column)) return false;
    }

    // Check 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            let subgrid = [];
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    subgrid.push(grid[row + r][col + c]);
                }
            }
            if (!hasUniqueNumbers(subgrid)) return false;
        }
    }

    return true;
}
  

  const handleSubmit = async () => {
    // TODO: Implement solution verification
    if(isValidSudoku(puzzle)){
      const data = {
        "name": gameData?.name ?? "",
        "phoneNumber": gameData?.phoneNumber ?? "",
        "difficulty": gameData?.difficulty ?? "",
      }
      const body = JSON.stringify(data);
      const signature = Base64.stringify(hmacSHA512(body, SECRET_KEY));
      const body64 = btoa(body)
      const hash = encodeURIComponent(body64 + '.' + signature)
      navigate('/view?hash='+ hash);
    } else {
      console.log('Submitted solution:', puzzle);
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 to-pink-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Solve the Puzzle to Create Your Rose
          </h2>
          
          {gameData && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <p className="text-gray-600">Creating a rose for: {gameData.name}</p>
                <p className="text-gray-600">
                  Difficulty: {gameData.difficulty} {gameData.difficulty === 1 ? 'thorn' : 'thorns'}
                </p>
              </div>
              
              <SudokuBoard
                puzzle={puzzle}
                onCellChange={(row, col, value) => {
                  const newPuzzle = [...puzzle];
                  newPuzzle[row][col] = value;
                  setPuzzle(newPuzzle);
                }}
              />

              <button
                onClick={handleSubmit}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Submit Solution
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}