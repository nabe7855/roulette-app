
export type QuestionType = 'roulette' | 'slot';

export interface Question {
  id: number;
  text: string;
  createdAt: string;
  type: QuestionType;
}