"use client";

import type { Character } from "@/data/characters";

export function CharacterGrid({
  characters,
  selectedId,
  onSelect,
}: {
  characters: Character[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="character-grid">
      {characters.map((c) => {
        const active = selectedId === c.id;
        return (
          <button
            key={c.id}
            type="button"
            className={`character-card ${active ? "active" : ""}`}
            style={{ ["--accent" as string]: c.accent }}
            onClick={() => onSelect(c.id)}
          >
            <span className="character-era">{c.era}</span>
            <strong className="character-name">{c.name}</strong>
            <span className="character-epithet">{c.epithet}</span>
            <span className="character-meta">
              {c.years} · {c.place}
            </span>
          </button>
        );
      })}
    </div>
  );
}
