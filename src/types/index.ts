export type Difficulty = 'easy' | 'medium' | 'hard';

export interface RoseFormData {
  name: string;
  phoneNumber: string;
  difficulty: Difficulty;
}

export interface GameData {
  puzzle: number[][];
  name: string;
  phoneNumber: string;
  difficulty: Difficulty;
  hash: string;
}

export interface GameSubmission {
  puzzle: number[][];
  solution: number[][];
  name: string;
  phoneNumber: string;
  difficulty: Difficulty;
  hash: string;
}

export interface SignedRoseData {
  name: string;
  phoneNumber: string;
  difficulty: Difficulty;
  signature: string;
}