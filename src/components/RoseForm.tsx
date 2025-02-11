import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RoseFormData, Difficulty } from '../types';

export function RoseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<RoseFormData>({
    name: '',
    phoneNumber: '',
    difficulty: 'easy'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/game', { state: formData });
  };

  const difficultyOptions: { value: Difficulty; label: string; thorns: number }[] = [
    { value: 'easy', label: '1 Thorn', thorns: 1 },
    { value: 'medium', label: '2 Thorns', thorns: 2 },
    { value: 'hard', label: '3 Thorns', thorns: 3 }
  ];

  return (<div className="flex flex-col items-center justify-center bg-pink-50 shadow rounded-lg p-6 sm:p-8">
    
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-4 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h1 className="text-2xl font-bold text-center text-rose-600">Rose Challenge</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-rose-700">Recipient's Name</label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-rose-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-rose-700 placeholder-rose-300"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter recipient's name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-rose-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-rose-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-rose-700 placeholder-rose-300"
            value={formData.phoneNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-rose-700">Difficulty Level</label>
          <select
            id="difficulty"
            required
            className="mt-1 block w-full rounded-md border-rose-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-rose-700"
            value={formData.difficulty}
            onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as Difficulty }))}
          >
            {difficultyOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <p className="mt-1 text-sm text-rose-500">The difficulty level determines how many thorns your rose will have</p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all transform hover:scale-105"
        >
          Create Rose Challenge
        </button>
      </form>
    </div>
  );
}
