import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserRound as Rose } from 'lucide-react';
import { SECRET_KEY } from '../utils/constant.tsx';

import hmacSHA512 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

export function RoseView() {
  const [searchParams] = useSearchParams();
  const [roseData, setRoseData] = React.useState({
    name: '',
    phoneNumber: '',
    difficulty: 0
  });
  const [error, setError] = React.useState<string | null>(null);  
  
  React.useEffect(() => {
    let hash = searchParams.get('hash');
    hash = decodeURIComponent(hash || '');
    if (hash) {
      const parsed  = hash.split('.');
      if (parsed.length !== 2) {
        setError('Invalid hash format');
        return;
      }
      const base64EncodedData = parsed[0];
      const signature = parsed[1];
      const data = atob(base64EncodedData)
      const verifySignature = Base64.stringify(hmacSHA512(data, SECRET_KEY));
      console.log(verifySignature);
      console.log(signature);
      console.log(data);
      if (signature !== verifySignature) {
        setError('Invalid hash signature');
        return;
      }
      const decoded = JSON.parse(data);
      if (!decoded.name || !decoded.phoneNumber || !decoded.difficulty) {
        setError('Invalid data');
        return;
      }
      setRoseData(decoded);
    } else {
      setError('Invalid hash');
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
              This rose has {roseData.difficulty} {roseData.difficulty == 1 ? 'thorn' : 'thorns'},
              representing the {roseData.difficulty} difficulty puzzle that was solved in your honor.
            </p>
          </div>

          <div className="inline-flex items-center justify-center space-x-2 text-rose-600">
            {Array(roseData.difficulty).fill(null).map((_, i) => (
              <span key={i}>🌹</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}