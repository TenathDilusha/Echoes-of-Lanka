"use client";

import { useEffect, useRef, useState } from "react";
import type { Character } from "@/data/characters";
import type { ChatResponse, RetrievedFact } from "@/lib/types";

type Turn = {
  id: string;
  user: string;
  dialogue: string;
  facts: RetrievedFact[];
  gaps: string[];
  model: string;
  mode: "ollama" | "fallback";
};

export function EchoChat({ character }: { character: Character }) {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTurns([]);
    setError(null);
    setInput("");
  }, [character.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns, pending]);

  async function send(message: string) {
    const trimmed = message.trim();
    if (!trimmed || pending) return;
    setError(null);
    setInput("");
    setPending(true);

    try {
      const history = turns.flatMap((t) => [
        { role: "user" as const, content: t.user },
        { role: "assistant" as const, content: t.dialogue },
      ]);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId: character.id,
          message: trimmed,
          history,
        }),
      });
      const data = (await res.json()) as ChatResponse & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setTurns((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          user: trimmed,
          dialogue: data.dialogue,
          facts: data.facts,
          gaps: data.gaps,
          model: data.model,
          mode: data.mode,
        },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="echo-shell">
      <aside className="echo-persona" style={{ ["--accent" as string]: character.accent }}>
        <p className="eyebrow">Speaking with</p>
        <h2>{character.name}</h2>
        <p className="epithet">{character.epithet}</p>
        <p className="persona-meta">
          {character.years}
          <br />
          {character.place}
        </p>
        <p className="persona-voice">{character.voice}</p>
        <div className="seed-row">
          {character.promptSeeds.map((seed) => (
            <button
              key={seed}
              type="button"
              className="seed"
              onClick={() => send(seed)}
              disabled={pending}
            >
              {seed}
            </button>
          ))}
        </div>
      </aside>

      <section className="echo-stage">
        <div className="legend">
          <span className="legend-fact">Verified sources</span>
          <span className="legend-echo">Imagined dialogue</span>
        </div>

        <div className="transcript" aria-live="polite">
          {turns.length === 0 && (
            <div className="empty-echo">
              <p className="greeting">{character.greeting}</p>
              <p className="hint">
                Every reply splits what the corpus can cite from what the open-weight
                model imagines. The ghost is labeled.
              </p>
            </div>
          )}

          {turns.map((turn) => (
            <article key={turn.id} className="turn">
              <div className="bubble user">
                <span className="label">You</span>
                <p>{turn.user}</p>
              </div>

              <div className="dual">
                <div className="panel fact-panel">
                  <header>
                    <span>Verified echoes</span>
                    <small>deterministic retrieval · not the model</small>
                  </header>
                  {turn.facts.length === 0 ? (
                    <p className="gap">No close corpus match for this question.</p>
                  ) : (
                    <ul>
                      {turn.facts.map((f) => (
                        <li key={f.id}>
                          <p>{f.claim}</p>
                          <div className="fact-meta">
                            <span className={`badge ${f.confidence}`}>
                              {f.confidence}
                            </span>
                            {f.sources.map((s) => (
                              <span key={s.title} className="source" title={s.detail}>
                                {s.title}
                              </span>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {turn.gaps.map((g) => (
                    <p key={g} className="gap">
                      {g}
                    </p>
                  ))}
                </div>

                <div className="panel echo-panel">
                  <header>
                    <span>Living voice · imagined</span>
                    <small>
                      {turn.mode === "ollama" ? turn.model : turn.model}
                    </small>
                  </header>
                  <p className="dialogue">{turn.dialogue}</p>
                </div>
              </div>
            </article>
          ))}

          {pending && (
            <div className="pending">
              <span className="pulse" />
              Listening through the rock…
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <div ref={bottomRef} />
        </div>

        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label className="sr-only" htmlFor="echo-input">
            Ask a question
          </label>
          <input
            id="echo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${character.name.split(" ")[0]}…`}
            disabled={pending}
            maxLength={1200}
          />
          <button type="submit" disabled={pending || !input.trim()}>
            Summon
          </button>
        </form>
      </section>
    </div>
  );
}
