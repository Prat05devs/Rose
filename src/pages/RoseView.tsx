import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserRound as Rose } from 'lucide-react';
import type { Difficulty } from '../types';

export function RoseView() {
  const [searchParams] = useSearchParams();
  const [roseData, setRoseData] = React.useState({
    name: '',
    phoneNumber: '',
    difficulty: 'easy' as Difficulty
  });

  React.useEffect(() => {
    // TODO: Verify signature and decode data
    const hash = searchParams.get('hash');
    if (hash) {
      setRoseData({
        name: 'John Doe',
        phoneNumber: '1234567890',
        difficulty: 'medium'
      });
    }
  }, [searchParams]);

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
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="mb-8">
            <Rose className="w-24 h-24 text-rose-600 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            A Rose For You
          </h1>

          <div className="space-y-4 mb-8">
            <p className="text-xl text-gray-700">Dear {roseData.name},</p>
            <p className="text-gray-600">
              Someone has solved a challenging puzzle to create this rose for you.
              This rose has {getThornsCount(roseData.difficulty)} {getThornsCount(roseData.difficulty) === 1 ? 'thorn' : 'thorns'},
              representing the {roseData.difficulty} difficulty puzzle that was solved in your honor.
            </p>
          </div>

          <div className="inline-flex items-center justify-center space-x-2 text-rose-600">
            {Array(getThornsCount(roseData.difficulty)).fill(null).map((_, i) => (
              <span key={i}>🌹</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}