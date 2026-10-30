import type { CharacterId } from "@/data/characters";

export type RetrievedFact = {
  id: string;
  claim: string;
  confidence: "chronicle" | "archaeology" | "scholarship";
  sources: { title: string; detail: string }[];
  score: number;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  characterId: CharacterId;
  message: string;
  history?: ChatMessage[];
};

export type ChatResponse = {
  dialogue: string;
  facts: RetrievedFact[];
  gaps: string[];
  model: string;
  mode: "ollama" | "fallback";
  disclaimer: string;
};
