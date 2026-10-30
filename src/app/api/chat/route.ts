import { getCharacter } from "@/data/characters";
import {
  fallbackDialogue,
  generateDialogue,
  getModelName,
  isOllamaUp,
} from "@/lib/ollama";
import { retrieveFacts } from "@/lib/retrieve";
import type { ChatMessage, ChatResponse } from "@/lib/types";

const DISCLAIMER =
  "Dialogue is an AI simulation. Verified claims come only from the curated corpus with sources — never from the model alone.";

export async function POST(req: Request) {
  let body: {
    characterId?: string;
    message?: string;
    history?: ChatMessage[];
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const character = getCharacter(body.characterId ?? "");
  if (!character) {
    return Response.json({ error: "Unknown character" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message || message.length > 1200) {
    return Response.json(
      { error: "Message required (max 1200 chars)" },
      { status: 400 },
    );
  }

  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];
  const { hits, gaps } = retrieveFacts(character.id, message);

  const up = await isOllamaUp();
  let dialogue: string;
  let mode: ChatResponse["mode"] = "fallback";
  let model = "fallback-template";

  if (up) {
    try {
      const result = await generateDialogue({
        character,
        facts: hits,
        message,
        history,
      });
      dialogue = result.text;
      model = result.model;
      mode = "ollama";
    } catch (err) {
      console.error("Ollama generation failed, using fallback:", err);
      dialogue = fallbackDialogue(character, hits, message);
      mode = "fallback";
      model = `fallback (ollama error; wanted ${getModelName()})`;
    }
  } else {
    dialogue = fallbackDialogue(character, hits, message);
    model = `fallback (start Ollama with ${getModelName()})`;
  }

  const response: ChatResponse = {
    dialogue,
    facts: hits,
    gaps,
    model,
    mode,
    disclaimer: DISCLAIMER,
  };

  return Response.json(response);
}

export async function GET() {
  const up = await isOllamaUp();
  return Response.json({
    ollama: up,
    model: getModelName(),
    status: up ? "ready" : "offline — run `ollama serve` and pull the model",
  });
}
