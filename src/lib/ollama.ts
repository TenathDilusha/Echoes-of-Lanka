import type { Character } from "@/data/characters";
import type { ChatMessage, RetrievedFact } from "./types";

const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "gemma3:4b";

export function getModelName() {
  return OLLAMA_MODEL;
}

export async function isOllamaUp(): Promise<boolean> {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, {
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function buildSystemPrompt(character: Character, facts: RetrievedFact[]): string {
  const factBlock =
    facts.length === 0
      ? "(No verified claims retrieved for this turn. Stay vague; do not invent dates, battles, or monuments.)"
      : facts
          .map(
            (f, i) =>
              `[FACT ${i + 1} | ${f.confidence}] ${f.claim}`,
          )
          .join("\n");

  return `You are a historical roleplay voice for "${character.name}" (${character.epithet}), ${character.years}, ${character.place}.

VOICE: ${character.voice}

CRITICAL RULES — open historical honesty:
1. Your reply is IMAGINED DIALOGUE only — a creative echo, never a primary source.
2. You may ONLY lean on the VERIFIED FACTS listed below for concrete historical claims.
3. If asked something outside those facts, say you do not remember / the chronicles are silent / later storytellers filled the gap — do not fabricate battles, dates, or monuments.
4. Never claim to be a living person or a supernatural possession; you are a simulation honoring memory.
5. Keep replies under 180 words. First person. Atmospheric but clear.
6. Do not list the facts as bullet points inside the dialogue; weave lightly or admit gaps.

VERIFIED FACTS (from curated corpus — these are NOT your invention):
${factBlock}`;
}

export async function generateDialogue(opts: {
  character: Character;
  facts: RetrievedFact[];
  message: string;
  history: ChatMessage[];
}): Promise<{ text: string; model: string }> {
  const system = buildSystemPrompt(opts.character, opts.facts);
  const messages = [
    { role: "system", content: system },
    ...opts.history.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: "user", content: opts.message },
  ];

  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 280,
      },
    }),
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Ollama error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    message?: { content?: string };
  };
  const text = data.message?.content?.trim();
  if (!text) throw new Error("Empty model response");
  return { text, model: OLLAMA_MODEL };
}

/** Offline demo voice when Ollama is unavailable — still fact-grounded. */
export function fallbackDialogue(
  character: Character,
  facts: RetrievedFact[],
  message: string,
): string {
  const opener = character.greeting;
  if (facts.length === 0) {
    return `${opener}\n\nThe chronicles grow quiet on that question. I will not invent what the stones and palm leaves do not hold. Ask me of ${character.place}, and I may answer with what remains.`;
  }
  const woven = facts
    .slice(0, 2)
    .map((f) => f.claim.replace(/\.$/, ""))
    .join(". ");
  return `${opener}\n\nYou asked: “${message.trim()}”\n\nWhat the record allows me to echo is this: ${woven}. Beyond that edge, I am only mist over the rock — an imagined voice, not a witness you can swear by.`;
}
