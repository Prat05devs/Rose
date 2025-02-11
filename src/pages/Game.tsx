import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SudokuBoard } from '../components/SudokuBoard';
import type { GameData } from '../types';

export function Game() {
  const location = useLocation();
  const navigate = useNavigate();
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
        difficulty: location.state?.difficulty || 'easy',
        hash: 'mock-hash'
      });
    };
    mockFetch();
  }, [location.state]);

  const handleSubmit = async () => {
    // TODO: Implement solution verification
    navigate('/view?hash=mock-signature');
  };

  const getThornsCount = (difficulty: string): number => {
    switch (difficulty) {
      case 'hard': return 3;
      case 'medium': return 2;
      case 'easy': return 1;
      default: return 1;
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
                  Difficulty: {gameData.difficulty} ({getThornsCount(gameData.difficulty)} {getThornsCount(gameData.difficulty) === 1 ? 'thorn' : 'thorns'})
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