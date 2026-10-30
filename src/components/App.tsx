"use client";

import { useState } from "react";
import { characters, getCharacter } from "@/data/characters";
import { CharacterGrid } from "./CharacterGrid";
import { EchoChat } from "./EchoChat";
import { ModelStatus } from "./ModelStatus";

export function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? getCharacter(selectedId) : undefined;

  return (
    <div className="page">
      <div className="atmosphere" aria-hidden="true">
        <div className="haze" />
        <div className="marigold marigold-a" />
        <div className="marigold marigold-b" />
        <div className="marigold marigold-c" />
        <div className="flame" />
      </div>

      <header className="topbar">
        <div className="brand-mark">
          <span className="lotus" aria-hidden="true" />
          <div>
            <p className="brand">Echoes of Lanka</p>
            <p className="brand-sub">Talk to History</p>
          </div>
        </div>
        <ModelStatus />
      </header>

      {!selected ? (
        <main className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Ghost in the Machine · Día de los Muertos spirit</p>
            <h1>
              Sit with the ones
              <span> the island still remembers.</span>
            </h1>
            <p className="lede">
              An ofrenda of open-weight AI: speak with King Kashyapa, fresco painters,
              stupa masons, and traders — while every factual claim stays pinned to
              curated sources, and every imagined reply is labeled as an echo.
            </p>
            <ul className="promise">
              <li>Open model locally via Ollama · Gemma</li>
              <li>Facts retrieved by code, not by the LLM</li>
              <li>History that stays private on your machine</li>
            </ul>
          </div>

          <section className="altar" aria-label="Choose a historical voice">
            <div className="altar-header">
              <h2>The altar</h2>
              <p>Choose a voice. The line between record and remembrance stays visible.</p>
            </div>
            <CharacterGrid
              characters={characters}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </section>
        </main>
      ) : (
        <main className="session">
          <button
            type="button"
            className="back"
            onClick={() => setSelectedId(null)}
          >
            ← Return to the altar
          </button>
          <EchoChat character={selected} />
        </main>
      )}

      <footer className="foot">
        <p>
          Built for Hacktoberfest Open-Source AI Challenge Week 4 — Ghost in the Machine.
          Open innovation here means family history and national memory need not leave your laptop.
        </p>
      </footer>
    </div>
  );
}
