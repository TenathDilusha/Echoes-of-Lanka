import { facts, type Fact } from "@/data/facts";
import type { CharacterId } from "@/data/characters";
import type { RetrievedFact } from "./types";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9āīūēōṣṭḍṇḷṃṅñ\s-]/gi, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

/** Deterministic keyword retrieval — no LLM involved in FACT selection. */
export function retrieveFacts(
  characterId: CharacterId,
  query: string,
  limit = 4,
): { hits: RetrievedFact[]; gaps: string[] } {
  const qTokens = new Set(tokenize(query));
  const scored = facts
    .filter((f) => f.characterIds.includes(characterId))
    .map((f) => ({ fact: f, score: scoreFact(f, qTokens, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const hits = scored.slice(0, limit).map(({ fact, score }) => ({
    id: fact.id,
    claim: fact.claim,
    confidence: fact.confidence,
    sources: fact.sources,
    score,
  }));

  const gaps: string[] = [];
  if (hits.length === 0) {
    gaps.push(
      "No curated claims matched this question closely. The echo may still speak, but treat any specifics as imagined unless sources appear.",
    );
  } else if (hits.every((h) => h.confidence === "chronicle")) {
    gaps.push(
      "Matched sources are primarily chronicle tradition — powerful memory, not always independently verified archaeology.",
    );
  } else if (hits.some((h) => h.confidence === "scholarship" && h.score === Math.max(...hits.map((x) => x.score)))) {
    gaps.push(
      "Top matches include scholarly interpretation. Debate may still be open.",
    );
  }

  return { hits, gaps };
}

function scoreFact(fact: Fact, qTokens: Set<string>, rawQuery: string): number {
  const hay = tokenize(`${fact.claim} ${fact.tags.join(" ")}`);
  let score = 0;
  for (const t of hay) {
    if (qTokens.has(t)) score += 2;
  }
  for (const tag of fact.tags) {
    if (rawQuery.toLowerCase().includes(tag.toLowerCase())) score += 3;
  }
  // Soft prior so thin queries still surface core bio facts
  if (qTokens.size <= 3) score += 1;
  return score;
}

export function characterFactBank(characterId: CharacterId): Fact[] {
  return facts.filter((f) => f.characterIds.includes(characterId));
}
