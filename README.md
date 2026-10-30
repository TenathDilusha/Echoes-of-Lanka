# Echoes of Lanka — Talk to History

A Sri Lankan historical roleplay altar powered by **open-weight AI**. Speak with King Kashyapa, Sigiriya fresco painters, Anuradhapura stupa masons, Sanghamittā Therī, Parākramabāhu I, and coastal cinnamon traders — while **verified claims stay separate from imagined dialogue**.

Built for **Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine** — honoring the past in the spirit of Día de los Muertos, with local inference at the core.

## Why open innovation matters here

National memory and family-adjacent stories should not require shipping prompts to a closed API. Echoes of Lanka:

- Runs **Gemma** locally through **Ollama** (no cloud key required for chat)
- Selects **FACTS with deterministic retrieval** over a curated corpus — the LLM never decides what is a fact
- Labels every reply as **imagined dialogue**, with sources visible beside it
- Works offline once the model is pulled (fallback template if Ollama is down)

## Quick start

```bash
# 1. Install deps
npm install

# 2. Start Ollama + pull Gemma (you already may have these)
ollama serve   # if not already running
ollama pull gemma3:4b

# 3. Run the app
cp .env.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional env:

| Variable | Default | Meaning |
| --- | --- | --- |
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama HTTP API |
| `OLLAMA_MODEL` | `gemma3:4b` | Open-weight chat model (`gemma3:1b` works on smaller machines) |

## Architecture

```
User question
    │
    ├─► retrieveFacts()  ── deterministic keyword score over curated corpus
    │         │
    │         └─► VERIFIED ECHOES panel (claims + sources + confidence)
    │
    └─► Ollama / Gemma  ── roleplay only, constrained to retrieved facts
              │
              └─► LIVING VOICE panel (explicitly imagined)
```

Confidence tags on facts:

- **chronicle** — Pali chronicle tradition (e.g. Mahavamsa / Culavamsa)
- **archaeology** — site / material evidence summaries
- **scholarship** — modern historical or technical interpretation

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Disclaimer

This is an educational simulation. Chronicle narratives are literary as well as historical. Imagined dialogue is fiction grounded by a small curated fact bank — not a substitute for academic research or living cultural authority.

## License

MIT
