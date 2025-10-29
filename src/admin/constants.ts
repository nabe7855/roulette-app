import type { Question } from "./types";

export const MAX_QUESTIONS = 200;
export const QUESTIONS_PER_PAGE = 10;

export const INITIAL_QUESTIONS: Question[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  text: `これはサンプル質問${i + 1}です。フランスの首都はどこですか？答えはパリです。これはテキストの折り返しをテストするための長い質問です。`,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString().split('T')[0],
  type: i % 2 === 0 ? 'roulette' : 'slot',
}));