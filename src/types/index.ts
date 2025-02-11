export interface RoseFormData {
  name: string;
  phoneNumber: string;
  difficulty: number;
}

export interface GameData {
  puzzle: number[][];
  name: string;
  phoneNumber: string;
  difficulty: number;
  hash: string;
}

export interface GameSubmission {
  puzzle: number[][];
  solution: number[][];
  name: string;
  phoneNumber: string;
  difficulty: number;
  hash: string;
}

export interface SignedRoseData {
  name: string;
  phoneNumber: string;
  difficulty:  number;
  signature: string;
}