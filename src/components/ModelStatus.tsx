"use client";

import { useEffect, useState } from "react";

export function ModelStatus() {
  const [status, setStatus] = useState<{
    ollama: boolean;
    model: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/chat")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setStatus({ ollama: data.ollama, model: data.model });
      })
      .catch(() => {
        if (!cancelled) setStatus({ ollama: false, model: "unknown" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!status) {
    return <span className="status-pill muted">Checking local model…</span>;
  }

  return (
    <span className={`status-pill ${status.ollama ? "ok" : "warn"}`}>
      {status.ollama
        ? `Local Gemma · ${status.model}`
        : `Offline fallback · start Ollama (${status.model})`}
    </span>
  );
}
